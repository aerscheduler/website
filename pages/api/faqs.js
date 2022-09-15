import { FaqsApi } from "@lib/faqs-api"
export default function handler(req, res) {
    res.status(200).json(FaqsApi)
  }