import Button from '@/components/Button';
import CheckBox from '@/components/form/CheckBox';
import SwitchBox from '@/components/form/SwitchBox';
import Settings from '@/components/icons/megamenu_account_office/Settings';
import MessagesIcon from '@/components/icons/v-webinar/MessagesIcon';
import PressentersIcon from '@/components/icons/v-webinar/PressentersIcon';
import Modal from '@/components/Modal';
import { WebinarSettingsType } from '@/utils/types';
import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction } from 'react';

type Props = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	newWebinarSettings: WebinarSettingsType;
	setNewWebinarSettings: Dispatch<SetStateAction<WebinarSettingsType>>;
	webinarSettingsChanged: boolean[];
	setWebinarSettingsChanged: Dispatch<SetStateAction<boolean[]>>;
	saveWebinarSettingsHandler: () => void;
	cancelWebinarSettingsHandler: () => void;
};

const WebinarSettingsModal = ({
	isOpen,
	setIsOpen,
	newWebinarSettings,
	setNewWebinarSettings,
	webinarSettingsChanged,
	setWebinarSettingsChanged,
	saveWebinarSettingsHandler,
	cancelWebinarSettingsHandler,
}: Props) => {
	const commonT = useTranslations('common');
	const t = useTranslations('vWebinars');

	return (
		<Modal
			heading={t('common.webinarRoomSettings')}
			icon={<Settings />}
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
		>
			<div className="space-y-4 text-sm font-semibold text-black/50">
				{/* CHAT OPTIONS */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1.5">
						<MessagesIcon />
						<p>{t('common.enableChat')}</p>
					</div>
					<SwitchBox
						selectedValue={newWebinarSettings.enable_chat}
						onChange={(value) => {
							setNewWebinarSettings({ ...newWebinarSettings, enable_chat: value });
							setWebinarSettingsChanged((prev) => {
								const newChanges = [...prev];
								newChanges[0] = !newChanges[0];
								return newChanges;
							});
						}}
					/>
				</div>
				<hr className="my-4" />
				{/* RAISING HANDS OPTIONS */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1.5">
						<PressentersIcon />
						<p>{t('common.allowAttendeesToRaiseHands')}</p>
					</div>
					<SwitchBox
						selectedValue={newWebinarSettings.allow_raising_hands}
						onChange={(value) => {
							setNewWebinarSettings({ ...newWebinarSettings, allow_raising_hands: value });
							setWebinarSettingsChanged((prev) => {
								const newChanges = [...prev];
								newChanges[1] = !newChanges[1];
								return newChanges;
							});
						}}
					/>
				</div>
				<hr className="my-4" />
				{/* PRIVATE MESSAGES OPTIONS */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1.5">
						<PressentersIcon />
						<p>{t('common.allowAttendeesToSendMePrivateMessages')}</p>
					</div>
					<SwitchBox
						selectedValue={newWebinarSettings.allow_private_messages}
						onChange={(value) => {
							setNewWebinarSettings({ ...newWebinarSettings, allow_private_messages: value });
							setWebinarSettingsChanged((prev) => {
								const newChanges = [...prev];
								newChanges[2] = !newChanges[2];
								return newChanges;
							});
						}}
					/>
				</div>
				<hr className="my-4" />
				{/* MAKE DEFAULT OPTIONS */}
				<div className="flex items-center">
					<CheckBox
						disabled={!webinarSettingsChanged.includes(true)}
						onChange={(value) => setNewWebinarSettings({ ...newWebinarSettings, is_default: value })}
					/>
					<p>{t('common.makeTheseSettingsDefaultForAllOfMyWebinars')}</p>
				</div>
				<hr className="my-4" />
				{/* ACTION BUTTONS */}
				<div className="flex items-center justify-center gap-4">
					<Button type="secondary" title="Cancel" onClick={cancelWebinarSettingsHandler} />
					<Button
						title={commonT('tooltips.save')}
						disabled={!webinarSettingsChanged.includes(true)}
						onClick={saveWebinarSettingsHandler}
					/>
				</div>
			</div>
		</Modal>
	);
};

export default WebinarSettingsModal;
