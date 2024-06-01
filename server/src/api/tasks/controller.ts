import { Request, Response } from 'express'

export async function getTasks(req: Request, res: Response) {
	try {
		return res.json({ message: 'getTasks' })
	} catch (error) {
		return res.status(500).json(error)
	}
}
