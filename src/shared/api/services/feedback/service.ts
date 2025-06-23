import { LeaveFeedbackRequest } from "./types";
import { baseApi, userApi } from "@/shared/api";

class FeedbackService {
    async leaveFeedback(data: LeaveFeedbackRequest) {
        return await userApi.post('/feedback/profile', data)
    }
}

export const feedbackService = new FeedbackService()