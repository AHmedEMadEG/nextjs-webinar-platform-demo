import { useToast } from '@/components/ui/use-toast';
import { useLazyGetAttendeesByWebinarIdQuery } from '@/lib/api/queries';
import { UserType } from '@/utils/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const useWebinarAttendeesLogic = () => {
	// SEARCH PARAMS HOOK
	const searchParams = useSearchParams();
	const webinarId = searchParams.get('id') || '';
	// QUERIES
	const [getWebinarAttendees] = useLazyGetAttendeesByWebinarIdQuery();

	// STATES
	const [webinarAttendees, setWebinarAttendees] = useState<UserType[] | null>(null);
	const [loadingAttendees, setLoadingAttendees] = useState(true);

	const { toast } = useToast();

	// FETCH ATTENDEES ON PAGE LOAD
	useEffect(() => {
		const fetchWebinarAttendees = async () => {
			const response: any = await getWebinarAttendees({
				podcastId: webinarId,
				queryParams: { profile_type_enum: 'all' },
			});
			setLoadingAttendees(false);
			if (!response.isSuccess) {
				toast({ title: response.error.data.message, variant: 'destructive' });
				return;
			}
			setWebinarAttendees(response.data.data);
		};
		fetchWebinarAttendees();
	}, [webinarId]);

	return { webinarAttendees, loadingAttendees };
};

export default useWebinarAttendeesLogic;
