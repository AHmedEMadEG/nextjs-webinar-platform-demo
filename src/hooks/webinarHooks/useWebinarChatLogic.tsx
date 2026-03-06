import { useToast } from '@/components/ui/use-toast';
import { useLazyGetAllPollsByWebinarIdQuery } from '@/lib/api/queries';
import { WebinarChatMessage } from '@/utils/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const useWebinarChatLogic = () => {
	// SEARCH PARAMS HOOK
	const searchParams = useSearchParams();
	const webinarId = searchParams.get('id') || '';
	// QUERIES
	const [getWebinarPolls] = useLazyGetAllPollsByWebinarIdQuery();

	// STATES
	const [publicMessages, setPublicMessages] = useState<WebinarChatMessage[]>([]);
	const [privateMessages, setPrivateMessages] = useState<WebinarChatMessage[]>([]);
	const [openTab, setOpenTab] = useState<'public' | 'private'>('public');
	const [sorting, setSorting] = useState('');

	const { toast } = useToast();
	// FETCHING POLLS
	useEffect(() => {
		const fetchWebinarPolls = async () => {
			const response = await getWebinarPolls(webinarId);
			if (response.isSuccess) {
				// setWebinarPolls(response.data.data);
			}
		};
		fetchWebinarPolls();
	}, [webinarId]);

	return {
		publicMessages,
		privateMessages,
		openTab,
		setOpenTab,
		sorting,
		setSorting,
	};
};

export default useWebinarChatLogic;
