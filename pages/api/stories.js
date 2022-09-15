import { StoriesApi } from "@lib/stories-api"
export default function handler(req, res) {
    res.status(200).json(StoriesApi)
  }