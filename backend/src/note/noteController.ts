import { NextFunction, Request, Response } from "express";
import noteModel from "./noteModel";
import envConfig from "../config/config";
import createHttpError from "http-errors";
import fs from 'fs';


const createNote = async (req:Request,res:Response,next:NextFunction)=>{
   try {
    const file = req.file ? `${envConfig.backendUrl}/${req.file.filename}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGdn5ODMa1UxSL5a172LJpZn6EjIX5THCdmA&s'
    const {title,subtitle,description} = req.body 
    if(!title || !subtitle || !description){
        res.status(400).json({
            message : "Please provide title,subtitle,description"
        })
        return
    }
    await noteModel.create({
        title, 
        subtitle, 
        description , 
        file
    })
    res.status(201).json({
        message : "Note created !"
    })
   } catch (error) {
    console.log(error)
    return next(createHttpError(500,'Error while creating'))
   }
}

const listNotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notes = await noteModel.find()
        res.status(200).json({
            message: "Notes Fetched",
            data: notes
        })
    } catch (error) {
        return next(createHttpError(500, "Error while fetching ..."))
    }
}

const listNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const note = await noteModel.findById(id)
        if(!note){
            return next(createHttpError(500, "Note not found with that id!"))
        }
        res.status(200).json({
            message: "Note Fetched",
            data: note
        })
    } catch (error) {
        return next(createHttpError(500, "Error while fetching ..."))
    }
}

const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const note = await noteModel.findByIdAndDelete(id)
        if (!note) {
            return next(createHttpError(500, "Note not found with that id!"))
        }
        const fileUrl = note.file
        const fileName = fileUrl.split('/').pop()
        if (fileName) {
            fs.unlink(`./src/uploads/${fileName}`, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("File deleted successfully")
                }
            })
        } else {
            console.log("File not found in this note")
        }
        res.status(200).json({
            message: "Note Deleted"
        })
    } catch (error) {
        return next(createHttpError(500, "Error while deleting ..."))
    }
}


export {createNote,listNotes,listNote,deleteNote}