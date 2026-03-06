import { useToast } from '@/components/ui/use-toast';
import { createWebinarEvent, updateWebinarEventStatus } from '@/firebase/webinars';
import {
	useLazyDeleteOfferByIdQuery,
	useLazyGetAllOffersByWebinarIdQuery,
	useLazyPostCreateWebinarOfferQuery,
	useLazyUpdateOfferByIdQuery,
} from '@/lib/api/queries';
import { WebinarOfferType } from '@/utils/types';
import { useFormik } from 'formik';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useWebinarEvents } from '../chat/useWebinarEvents';

const useWebinarOffersLogic = () => {
	// SEARCH PARAMS HOOK
	const searchParams = useSearchParams();
	const webinarId = searchParams.get('id') || '';
	// QUERIES
	const [getWebinarOffers] = useLazyGetAllOffersByWebinarIdQuery();
	const [createWebinarOffer] = useLazyPostCreateWebinarOfferQuery();
	const [deleteWebinarOffer] = useLazyDeleteOfferByIdQuery();
	const [updateWebinarOffer] = useLazyUpdateOfferByIdQuery();

	// STATES
	const [webinarOffers, setWebinarOffers] = useState<WebinarOfferType[] | null>(null);
	const [loadingOffers, setLoadingOffers] = useState(true);
	const [addingNewOffer, setAddingNewOffer] = useState(false);
	const [offerToBeEdited, setOfferToBeEdited] = useState<WebinarOfferType | null>(null);
	const [offerFormloading, setOfferFormloading] = useState(false);

	const { toast } = useToast();

	const fetchWebinarOffers = async () => {
		const response: any = await getWebinarOffers(+webinarId);
		setLoadingOffers(false);
		if (!response.isSuccess) {
			toast({ title: response.error.data.message, variant: 'destructive' });
			return;
		}
		setWebinarOffers(response.data.data);
	};

	// FETCH OFFERS ON PAGE LOAD
	useEffect(() => {
		fetchWebinarOffers();
	}, []);

	// Real-Time Fetching
	useWebinarEvents(webinarId, 'Offers', () => {
		fetchWebinarOffers();
	});

	// FORM LOGIC
	const validationSchema = Yup.object().shape({
		title: Yup.string().required('The Offer Title field is required'),
		description: Yup.string().required('The Offer Description field is required'),
		offer_image: Yup.number().required('The Offer Image is required'),
		button_url: Yup.string()
			.required('The Offer Button URL field is required')
			.matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 'Please enter a valid URL'),
	});

	const initialValues: WebinarOfferType = {
		id: offerToBeEdited?.id || '0',
		title: offerToBeEdited?.title || '',
		description: offerToBeEdited?.description || '',
		offer_image: offerToBeEdited?.offer_image,
		button_url: offerToBeEdited?.button_url || '',
		publish_enum: offerToBeEdited?.publish_enum || 'draft',
		is_scheduled: offerToBeEdited?.is_scheduled || false,
		scheduled_at_hours: offerToBeEdited?.scheduled_at_hours || 0,
		scheduled_at_minutes: offerToBeEdited?.scheduled_at_minutes || 0,
		scheduled_at_seconds: offerToBeEdited?.scheduled_at_seconds || 0,
	};

	const offerForm = useFormik<WebinarOfferType>({
		initialValues,
		validationSchema,
		validateOnMount: true,
		enableReinitialize: true,
		onSubmit: async (values, { resetForm }) => {
			setOfferFormloading(true);

			const body: WebinarOfferType | { webinar_id: string } = {
				publish_enum: 'draft',
				is_scheduled: false,
				webinar_id: webinarId,
				...values,
			};

			const response: any = offerToBeEdited
				? await updateWebinarOffer({ id: offerToBeEdited.id, body })
				: await createWebinarOffer({ body });

			if (response.status !== 'fulfilled') {
				toast({ title: response.error.data.message, variant: 'destructive' });
			} else {
				toast({ title: `Offer ${offerToBeEdited ? 'Edited' : 'Created'} Successfully` });

				if (!offerToBeEdited) {
					// Handle creation logic
					await createWebinarEvent({
						webinarId,
						eventTargetId: response.data.data.id,
						type: 'Offers',
						status: 'create',
					});
					resetForm();
					setAddingNewOffer(false);
					setWebinarOffers((prev) =>
						prev ? [...prev, { ...values, id: response.data.data.id }] : [{ ...values, id: response.data.data.id }]
					);
				} else {
					// Handle editing logic
					await updateWebinarEventStatus(webinarId, response.data.data.id, 'Offers', 'update');
					setWebinarOffers((prev) =>
						prev ? prev.map((offer) => (offer.id === offerToBeEdited.id ? { ...values } : offer)) : null
					);
				}
				setOfferToBeEdited(null);
			}
			setOfferFormloading(false);
		},
	});

	const removeOffer = async (id: string) => {
		await updateWebinarEventStatus(webinarId, +id, 'Offers', 'delete');
		const response: any = await deleteWebinarOffer(id);
		if (response.status !== 'fulfilled') {
			toast({ title: response.error.data.message, variant: 'destructive' });
		} else {
			toast({ title: 'Offer Deleted Successfully' });
			const filteredWebinarOffers = webinarOffers ? webinarOffers.filter((offer) => offer.id !== id) : null;
			setWebinarOffers(filteredWebinarOffers);
		}
	};

	const publishOffer = async (offer: WebinarOfferType) => {
		const body = {
			...offer,
			publish_enum: 'published',
			offer_image: typeof offer.offer_image === 'object' ? offer.offer_image.id : offer.offer_image,
		};

		const response: any = await updateWebinarOffer({ id: offer.id, body });

		if (response.status !== 'fulfilled') {
			toast({ title: response.error.data.message, variant: 'destructive' });
		} else {
			await updateWebinarEventStatus(webinarId, +offer.id, 'Offers', 'publish');
			toast({ title: 'Offer Published Successfully' });
			setWebinarOffers((prev) =>
				prev
					? prev.map((prevOffer) =>
							prevOffer.id === offer.id ? { ...prevOffer, publish_enum: 'published' } : prevOffer
						)
					: null
			);
		}
	};

	return {
		webinarOffers,
		loadingOffers,
		offerFormloading,
		webinarId,
		addingNewOffer,
		setAddingNewOffer,
		offerToBeEdited,
		setOfferToBeEdited,
		offerForm,
		removeOffer,
		publishOffer,
	};
};

export default useWebinarOffersLogic;
