import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:8000/api';

// Configuración del cliente axios
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Tipo para los errores de validación
interface ValidationErrors {
    [key: string]: string[];
}

// Servicios de autenticación
export const authService = {
    login: async (username: string, contraseña: string) => {
        try {
            const response = await api.post('/auth/login/', { username, contraseña });
            if (response.data.access) {
                localStorage.setItem('access_token', response.data.access);
            }
            return { data: response.data, error: null };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{error?: string, detail?: string}>;
                return {
                    data: null,
                    error: axiosError.response?.data?.error || axiosError.response?.data?.detail || 'Error al iniciar sesión'
                };
            }
            return { data: null, error: 'Error al iniciar sesión' };
        }
    },
    
    register: async (userData: {
        username: string;
        contraseña: string;
        confirmar_contraseña: string;
        email: string;
        nombre: string;
        apellido: string;
    }) => {
        try {
            const response = await api.post('/auth/registro/', userData);
            if (response.data.access) {
                localStorage.setItem('access_token', response.data.access);
            }
            return { data: response.data, error: null };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ValidationErrors>;
                const errorMessages: { [key: string]: string } = {};
                
                if (axiosError.response?.data) {
                    Object.entries(axiosError.response.data).forEach(([field, errors]) => {
                        if (Array.isArray(errors)) {
                            errorMessages[field] = errors[0];
                        } else if (typeof errors === 'string') {
                            errorMessages[field] = errors;
                        }
                    });
                }
                
                return {
                    data: null,
                    errors: errorMessages
                };
            }
            return {
                data: null,
                errors: { general: 'Error al registrar usuario' }
            };
        }
    },

    logout: () => {
        localStorage.removeItem('access_token');
    }
};

// Servicios de productos
export const productService = {
    getAllProducts: async () => {
        const response = await api.get('/productos/');
        return response.data;
    },

    getProductById: async (id: number) => {
        const response = await api.get(`/productos/${id}/`);
        return response.data;
    },
};

// Servicios de ventas
export const ventaService = {
    createVenta: async (ventaData: any) => {
        const response = await api.post('/ventas/', ventaData);
        return response.data;
    },

    getVentas: async () => {
        const response = await api.get('/ventas/lista/');
        return response.data;
    },

    getVentaById: async (id: number) => {
        const response = await api.get(`/ventas/${id}/`);
        return response.data;
    },
}; 