import ManufacturerService from '../../services/ManufacturerService';
import {
    COMMON_ERROR_SET,
    COMMON_LOADING_SET,
    COMMON_MESSAGE_SET,
    MANUFACTURERS_SET,
    MANUFACTURER_APPEND,
    MANUFACTURER_DELETE,
    MANUFACTURER_SET,
} from './actionTypes';

export const insertManufacturer = (manufacturer) => async (dispatch) => {
    const service = new ManufacturerService();

    try {
        console.log('Insert Manufacturer');

        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.insertManufacturer(manufacturer);

        if (response.status === 201) {
            dispatch({
                type: MANUFACTURER_SET,
                payload: response.data,
            });
            dispatch({
                type: MANUFACTURER_APPEND,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'Manufacturer is saved',
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }

        console.log(response);
    } catch (error) {
        console.log(error);
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });
};

export const getManufacturers = () => async (dispatch) => {
    const service = new ManufacturerService();

    try {
        console.log('get Manufacturers');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });
        const response = await service.getManufacturers();

        console.log(response);

        if (response.status === 200) {
            dispatch({
                type: MANUFACTURERS_SET,
                payload: response.data,
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });
};

export const deleteManufacturer = (id) => async (dispatch) => {
    const service = new ManufacturerService();

    try {
        console.log('delete Manufacturer');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });
        const response = await service.deleteManufacturer(id);

        console.log(response);

        if (response && response.status === 200) {
            dispatch({
                type: MANUFACTURER_DELETE,
                payload: id,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: response.data,
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });
};
