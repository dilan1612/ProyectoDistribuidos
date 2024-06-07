import axios from "./axios";

const API = 'http://localhost:3001/api'
export const registerRequest= async (user) => await axios().post(`/register`,user) 
export const registerAbogaRequest= async(abogado) => await axios().post(`/abogadoregister`,abogado)     
export const loginRequest= async (user) => await axios().post(`/login`,user)   
export const loginRequestAbogado= async (abogado) => await axios().post(`/abogadologin`,abogado)  

export const verifyTokenRequest = async () => await axios().get(`/verify`);

export const getAbogadosData = async () => await axios().get(`/allabogados`)
