//http routing k leya
import { express } from "express";

//jwt imoprt  jsonwebtoken k leya
import { Jwt } from "jsonwebtoken";
//jwt secret key verufy k leya
import { JWT_SECRET } from '@repo/backend-common/config';

import { middleware } from "./middleware";
//zod schema se validate sigin function 


//prims client datbase oirnetation
import {prismaClient }

import bcrypt from "bcrypt";
import cors from 'cors';


//app inistalise
const app=express();
app.use(express.json());

app.use(cors());


//radnom room code generate krne ke lya





