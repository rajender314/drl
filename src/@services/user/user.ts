import axios from 'axios';
import { loginService, service } from '../interceptor';
const saveToken = (access_token: any, refresh_token: any) => {
	localStorage.setItem('access_token', access_token);
	localStorage.setItem('refresh_token', refresh_token);
}
export const getUserInfo = () => {
	return service
		.get(`/emp-service/getUserInfo`)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const getUserInfoPwa = (suid: any) => {
	return service
		.get(`/coverage-service/products/coverage/getUserAccountDetailBySvaasUserId?svaasUserId=${suid}`)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const getNewToken = (resetTokenUrl: string) => {
	let params = {
		"grant_type": "refresh_token",
		"refresh_token": localStorage.getItem('refresh_token')
	}
	var headers = {
		headers: {
			Authorization: localStorage.getItem('access_token')
		}
	}
	// console.log(params);
	// console.log(headers);
	let url = process.env.REACT_APP_API_URL + resetTokenUrl;
	// console.log(url)
	//https://qa.svaas.com/api/auth/generate/token
	return axios.post(url, params, headers)
		.then((res: any) => {
			return res;
		})
		.catch((error: any) => {
			return error;
		});

};

export const getUserDetail = (userId?: any) => {
	let query = '';
	if (userId) {
		query = `?userId=${userId}`;
	}
	return service.get(`/emp-service/userdetail${query}`)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const getUserAddressess = () => {
	let query = `?patientId=${sessionStorage.getItem(
		'patientId'
	)}`
	return service.get(`/emp-service/get-address${query}`)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const updateAddress = (params: any) => {
	let query = `?patientId=${sessionStorage.getItem(
		'patientId'
	)}`
	return service.put(`/emp-service/update-address${query}`, params)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const addAddress = (params: any) => {
	let query = `?patientId=${sessionStorage.getItem(
		'patientId'
	)}`
	return service.post(`/emp-service/create-user-address${query}`, params)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const deleteAddress = (id: any) => {
	let query = id ? `?id=${id}` : ''
	return service.delete(`/emp-service/delete-address${query}`)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const login = (params: any) => {

	return service.post(`/api/auth/employee/signin`, params)
		.then((res) => {
			saveToken(res.data.access_token, res.data.refresh_token)
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const memberSignIn = (params: any) => {

	return service.post(`/api/auth/employee/member/signin`, params)
		.then((res) => {
			saveToken(res.data.access_token, res.data.refresh_token)
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const clearSession = () => {
	return service.post(`api/auth/signout`)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const generateOtp = (params: any) => {

	return service.post(`api/auth/employee/generate-otp`, params)
		.then((res) => {
			// saveToken(res.data.access_token, res.data.refresh_token)
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const verifyOtp = (params: any) => {

	return service.post(`api/auth/employee/verify-otp-signin`, params)
		.then((res) => {
			saveToken(res.data.access_token, res.data.refresh_token)
			return res;
		})
		.catch((error) => {
			return error;
		});
};

export const otpDuration = () => {

	return service.get(`api/auth/employee/get-resend-otp-time-duration`)
		.then((res) => {
			// saveToken(res.data.access_token, res.data.refresh_token)
			return res;
		})
		.catch((error) => {
			return error;
		});
};
export const setPin = (params: any) => {

	return service.post(`api/auth/employee/set-pin`, params)
		.then((res) => {
			// saveToken(res.data.access_token, res.data.refresh_token)
			return res;
		})
		.catch((error) => {
			return error;
		});
};