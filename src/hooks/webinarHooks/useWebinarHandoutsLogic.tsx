import { useToast } from '@/components/ui/use-toast';
import { createWebinarEvent, updateWebinarEventStatus } from '@/firebase/webinars';
import {
	useLazyDeleteHandoutByIdQuery,
	useLazyGetAllHandoutsByWebinarIdQuery,
	useLazyPostCreateWebinarHandoutQuery,
	useLazyUpdateHandoutByIdQuery,
} from '@/lib/api/queries';
import { WebinarHandoutType } from '@/utils/types';
import { useFormik } from 'formik';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useWebinarEvents } from '../chat/useWebinarEvents';

const useWebinarHandoutsLogic = () => {
	// SEARCH PARAMS HOOK
	const searchParams = useSearchParams();
	const webinarId = searchParams.get('id') || '';
	// QUERIES
	const [getWebinarHandouts] = useLazyGetAllHandoutsByWebinarIdQuery();
	const [createWebinarHandout] = useLazyPostCreateWebinarHandoutQuery();
	const [deleteWebinarHandout] = useLazyDeleteHandoutByIdQuery();
	const [updateWebinarHandout] = useLazyUpdateHandoutByIdQuery();

	// STATES
	const [webinarHandouts, setWebinarHandouts] = useState<WebinarHandoutType[] | null>(null);
	const [loadingHandouts, setLoadingHandouts] = useState(true);
	const [addingNewHandout, setAddingNewHandout] = useState(false);
	const [handoutToBeEdited, setHandoutToBeEdited] = useState<WebinarHandoutType | null>(null);
	const [handoutFormloading, setHandoutFormloading] = useState(false);

	const { toast } = useToast();

	const fetchWebinarHandouts = async () => {
		const response: any = await getWebinarHandouts(+webinarId);
		setLoadingHandouts(false);
		if (!response.isSuccess) {
			toast({ title: response.error.data.message, variant: 'destructive' });
			return;
		}
		setWebinarHandouts(response.data.handouts);
	};

	// FETCH HANDOUTS ON PAGE LOAD
	useEffect(() => {
		fetchWebinarHandouts();
	}, []);

	// Real-Time Fetching
	useWebinarEvents(webinarId, 'Handouts', () => {
		fetchWebinarHandouts();
	});

	// FORM LOGIC
	const validationSchema = Yup.object().shape({
		title: Yup.string().required('The Handout Title field is required'),
		description: Yup.string().required('The Handout Description field is required'),
		handout_file: Yup.number().required('The Handout File field is required'),
	});

	const initialValues: WebinarHandoutType = {
		id: handoutToBeEdited?.id || '0',
		title: handoutToBeEdited?.title || '',
		description: handoutToBeEdited?.description || '',
		handout_file: handoutToBeEdited?.handout_file,
		publish_enum: handoutToBeEdited?.publish_enum || 'draft',
		is_scheduled: handoutToBeEdited?.is_scheduled || false,
		scheduled_at_hours: handoutToBeEdited?.scheduled_at_hours || 0,
		scheduled_at_minutes: handoutToBeEdited?.scheduled_at_minutes || 0,
		scheduled_at_seconds: handoutToBeEdited?.scheduled_at_seconds || 0,
	};

	const handoutForm = useFormik<WebinarHandoutType>({
		initialValues,
		validationSchema,
		validateOnMount: true,
		enableReinitialize: true,
		onSubmit: async (values, { resetForm }) => {
			setHandoutFormloading(true);
			const body: WebinarHandoutType | { webinar_id: string } = {
				publish_enum: 'draft',
				is_scheduled: false,
				webinar_id: webinarId,
				...values,
			};

			const response: any = handoutToBeEdited
				? await updateWebinarHandout({ id: handoutToBeEdited.id, body })
				: await createWebinarHandout({ body });

			if (response.status !== 'fulfilled') {
				toast({ title: response.error.data.message, variant: 'destructive' });
			} else {
				toast({ title: response.data.message });

				if (!handoutToBeEdited) {
					// Handle creation logic
					await createWebinarEvent({
						webinarId,
						eventTargetId: response.data.handout.id,
						type: 'Handouts',
						status: 'create',
					});
					resetForm();
					setAddingNewHandout(false);
					setWebinarHandouts((prev) =>
						prev
							? [...prev, { ...values, id: response.data.handout.id }]
							: [{ ...values, id: response.data.handout.id }]
					);
				} else {
					// Handle editing logic
					await updateWebinarEventStatus(webinarId, response.data.handout.id, 'Handouts', 'update');
					setWebinarHandouts((prev) =>
						prev ? prev.map((handout) => (handout.id === handoutToBeEdited.id ? { ...values } : handout)) : null
					);
				}
				setHandoutToBeEdited(null);
			}
			setHandoutFormloading(false);
		},
	});

	const removeHandout = async (id: string) => {
		const response: any = await deleteWebinarHandout(id);
		if (response.status !== 'fulfilled') {
			toast({ title: response.error.data.message, variant: 'destructive' });
		} else {
			await updateWebinarEventStatus(webinarId, +id, 'Handouts', 'delete');
			toast({ title: 'Handout Deleted Successfully' });
			const filteredWebinarHandouts = webinarHandouts ? webinarHandouts.filter((handout) => handout.id !== id) : null;
			setWebinarHandouts(filteredWebinarHandouts);
		}
	};

	const publishHandout = async (handout: WebinarHandoutType) => {
		const handoutFileId = typeof handout.handout_file === 'number' ? handout.handout_file : handout.handout_file?.id;
		const response: any = await updateWebinarHandout({
			id: handout.id,
			body: { ...handout, handout_file: handoutFileId, publish_enum: 'published' },
		});
		if (response.status !== 'fulfilled') {
			toast({ title: response.error.data.message, variant: 'destructive' });
		} else {
			await updateWebinarEventStatus(webinarId, +handout.id, 'Handouts', 'publish');
			toast({ title: 'Handout Published Successfully' });
			setWebinarHandouts((prev) =>
				prev
					? prev.map((prevHandout) =>
							prevHandout.id === handout.id ? { ...prevHandout, publish_enum: 'published' } : prevHandout
						)
					: null
			);
		}
	};

	const handoutDownloadHandler = async (handout: WebinarHandoutType) => {
		if (typeof handout.handout_file !== 'number' && handout.handout_file?.url) {
			try {
				const response = await fetch(handout.handout_file.url);
				const blob = await response.blob();
				const blobUrl = window.URL.createObjectURL(blob);

				const link = document.createElement('a');
				link.href = blobUrl;
				link.download = handout.title || 'downloaded-image';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				window.URL.revokeObjectURL(blobUrl);
			} catch (error) {
				toast({ title: 'Failed to download handout file', variant: 'destructive' });
			}
		}
	};

	return {
		webinarHandouts,
		loadingHandouts,
		handoutFormloading,
		webinarId,
		addingNewHandout,
		setAddingNewHandout,
		handoutToBeEdited,
		setHandoutToBeEdited,
		handoutForm,
		removeHandout,
		publishHandout,
		handoutDownloadHandler,
	};
};

export default useWebinarHandoutsLogic;
