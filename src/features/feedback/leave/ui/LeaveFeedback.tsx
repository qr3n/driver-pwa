import { StarIcon, CheckIcon } from "lucide-react";
import { Rating } from "react-simple-star-rating";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { IOrder } from "@/entities/order";
import { Button } from "@/shared/shadcn/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/shared/shadcn/ui/dialog";
import { Textarea } from "@/shared/shadcn/ui/textarea";
import { feedbackService } from "@/shared/api/services/feedback/service";

interface IProps {
    order: IOrder
}

interface IFormData {
    stars: number,
    comment: string,
    details: string[],
}

// Варианты для положительных оценок клиента (4-5 звезд)
const positiveDetails = [
    { id: 'polite_client', label: 'Вежливый клиент' },
    { id: 'ready_on_time', label: 'Готов к получению вовремя' },
    { id: 'clear_address', label: 'Четкий адрес' },
    { id: 'easy_contact', label: 'Легко связаться' },
    { id: 'respectful_behavior', label: 'Уважительное поведение' },
];

// Варианты для отрицательных оценок клиента (1-3 звезды)
const negativeDetails = [
    { id: 'rude_client', label: 'Грубый клиент' },
    { id: 'long_wait', label: 'Долго ждал клиента' },
    { id: 'wrong_address', label: 'Неверный адрес' },
    { id: 'no_response', label: 'Не отвечает на звонки' },
    { id: 'inappropriate_behavior', label: 'Неподобающее поведение' },
];

export const LeaveFeedback = (props: IProps) => {
    const [open, setOpen] = useState(false)
    const [selectedDetails, setSelectedDetails] = useState<string[]>([])
    const hasFeedback = false

    const { register, setValue, watch, handleSubmit } = useForm<IFormData>({
        defaultValues: {
            stars: 4,
            comment: '',
            details: []
        }
    })

    const currentRating = watch('stars') || (4)

    const { mutateAsync } = useMutation({
        mutationFn: feedbackService.leaveFeedback
    })

    const onSubmit = handleSubmit((data) => {
        if (hasFeedback) return

        toast.promise(mutateAsync({
                ...data,
                details: selectedDetails,
                order_id: props.order.id,
                user_id: props.order.user_id
            }).then(() => {
                setOpen(false)
                setSelectedDetails([])
            }),
            {
                success: "Отзыв отправлен.",
                error: "Что-то пошло не так...",
                loading: "Отправляем отзыв...",
            })
    })

    const handleRatingChange = (value: number) => {
        if (hasFeedback) return // Блокируем изменение рейтинга если фидбек уже есть

        setValue('stars', value)
        // Сбрасываем выбранные детали при смене оценки
        setSelectedDetails([])
    }

    const toggleDetail = (detailId: string) => {
        if (hasFeedback) return // Блокируем изменение деталей если фидбек уже есть

        setSelectedDetails(prev =>
            prev.includes(detailId)
                ? prev.filter(id => id !== detailId)
                : [...prev, detailId]
        )
    }

    const getDetailsToShow = () => {
        return (currentRating || 0) >= 4 ? positiveDetails : negativeDetails
    }

    const getDetailsTitle = () => {
        if (hasFeedback) {
            return (currentRating || 0) >= 4 ? 'Что понравилось:' : 'Что не понравилось:'
        }
        return (currentRating || 0) >= 4 ? 'Что понравилось?' : 'Что не понравилось?'
    }

    const getModalTitle = () => {
        return hasFeedback ? 'Ваша оценка заказа' : 'Оценить заказ'
    }

    const getModalDescription = () => {
        return hasFeedback ? 'Спасибо за ваш отзыв!' : 'Ваше мнение поможет нам стать лучше'
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                setOpen(isOpen)
                if (!isOpen && !hasFeedback) {
                    setSelectedDetails([])
                }
            }}
        >
            <DialogTrigger asChild>
                <Button size='icon' variant='ghost' className={`${hasFeedback ? 'bg-green-400/30 p-3' : 'p-3 bg-yellow-400/30'}`}>
                    <StarIcon className={`${hasFeedback ? 'text-green-400' : 'text-yellow-400'}`}/>
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {getModalTitle()}
                    </DialogTitle>
                    <DialogDescription>
                        {getModalDescription()}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className='w-full px-4 sm:px-0'>
                    <div className='flex pb-6 w-full pt-4 sm:pt-6'>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Rating
                                initialValue={currentRating}
                                onClick={handleRatingChange}
                                size={32}
                                transition
                                readonly={hasFeedback}

                                style={{display: 'flex', flexDirection: 'row', width: '100%'}}
                            />
                        </div>
                    </div>

                    {/* Детали оценки */}
                    <div className='mb-6'>
                        <h4 className='text-sm font-medium text-zinc-400 mb-3'>
                            {getDetailsTitle()}
                        </h4>
                        <div className='grid grid-cols-1 gap-2'>
                            {getDetailsToShow().map((detail) => (
                                <button
                                    key={detail.id}
                                    type="button"
                                    onClick={() => toggleDetail(detail.id)}
                                    disabled={hasFeedback}
                                    className={`
                                    flex items-center justify-between p-3 rounded-full transition-all
                                    ${selectedDetails.includes(detail.id)
                                        ? 'bg-zinc-700 text-white'
                                        : 'border-transparent hover:bg-zinc-800'
                                    }
                                    ${hasFeedback ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}
                                `}
                                >
                                    <span className='text-sm font-medium'>{detail.label}</span>
                                    <div className={`
                                    w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                                    ${selectedDetails.includes(detail.id)
                                        ? 'border-blue-500 bg-blue-500'
                                        : 'border-gray-300'
                                    }
                                `}>
                                        {selectedDetails.includes(detail.id) && (
                                            <CheckIcon className='w-3 h-3 rounded-full text-white' />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Комментарий */}
                    <div className='mb-6 dark'>
                        <Textarea
                            {...register('comment')}
                            placeholder={(currentRating || 0) >= 4
                                ? 'Расскажите, что особенно понравилось...'
                                : 'Расскажите, что можно улучшить...'
                            }
                            className='resize-none text-sm h-[80px]'
                            disabled={hasFeedback}
                            readOnly={hasFeedback}
                        />
                    </div>

                    {!hasFeedback && (
                        <Button type="submit" className='w-full'>
                            Отправить отзыв
                        </Button>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    )
}