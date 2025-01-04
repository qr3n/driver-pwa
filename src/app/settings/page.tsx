import { SwitchNotificationsStatus } from "@/features/notifications/switch-status/ui/SwitchNotificationsStatus";
import { Switch } from "@/shared/shadcn/ui/switch";

export default function SettingsPage() {
    return (
        <div className='flex items-center flex-col px-8'>
            <div className='flex items-start w-full flex-col max-w-2xl gap-4'>
                <h1 className='mt-12 text-3xl font-semibold w-full text-center'>Настройки</h1>

                <h2 className='mt-4 font-semibold text-xl'>Уведомления</h2>
                <div className='flex w-full items-center justify-between p-4 border border-[#333] rounded-2xl gap-3'>
                    <div>
                        <h2 className='font-medium text-md sm:text-lg'>Push-уведомления</h2>
                        <h2 className='text-[#aaa] text-xs sm:text-sm'>Получайте уведомления прямо на ваше устройство</h2>
                    </div>
                    <SwitchNotificationsStatus/>
                </div>
                <div className='flex w-full items-center justify-between border border-[#333] p-4 rounded-2xl gap-3'>
                    <div>
                        <h2 className='font-medium text-md sm:text-lg'>Оповещения по почте</h2>
                        <h2 className='text-[#aaa] text-xs sm:text-sm'>Уведомления будут приходить вам на почту</h2>
                    </div>
                    <Switch defaultChecked/>
                </div>
            </div>
        </div>
    )
}