import axios from 'axios';
import { service } from './../@services/interceptor'

export const wwwCorseIssue = (url: string) => {
    let uri = new URL(window.location.href);
    if (uri.host.includes('www')) {
        return url.replace("https://", "https://www.");
    }else{
        return url;
    }

}

export function downloadPDF(url: string, filename: string) {
    /* let uri = `https://stage.svaas.com/storage/drlsvaas/lab-invoice-2776222-1628686055770-8172712940465960138.pdf?sp=r&st=2021-08-12T10:43:31Z&se=2021-08-12T18:43:31Z&spr=https&sv=2020-08-04&sr=b&sig=bEeZb8W6vuLwHaRiXlhri1Tp8Bj%2FBh%2F86ZUf8dOllOM%3D`;
    */

    let hostUrl = new URL(window.location.href)
    var uri = new URL(url);
    if (url.includes(hostUrl.hostname)) {
        // uri.href = url
        //uri.hostname = hostUrl.hostname;
    } else {

        uri.hostname = hostUrl.hostname;
    }

    return service.get(uri.href).then((t: any) => {
        return t.blob().then((b: any) => {
            var a = document.createElement('a');
            a.href = URL.createObjectURL(b);
            a.setAttribute('download', filename);
            a.click();
        });
    }).catch((error: any) => { return error })
}

export function directDownload(url: string, filename: string) {
    //wwwCorseIssue(url)
    var link = document.createElement('a');
    link.href = wwwCorseIssue(url);
    link.download = filename;
    link.dispatchEvent(new MouseEvent('click'));
}
export const directDownloadAs = async (url: string, name: string) => {
    let path = wwwCorseIssue(url);
    const blob = await axios.get(path, {
        headers: {
            'Content-Type': 'application/octet-stream',
        },
        responseType: 'blob',
    });
    const a = document.createElement('a');
    const href = window.URL.createObjectURL(blob.data);
    a.href = href;
    a.download = name;
    a.click();
};

export function openLink(url: string) {
    var link = document.createElement('a');
    link.href =  wwwCorseIssue(url);
    link.target = '_blank';
    link.dispatchEvent(new MouseEvent('click'));
}
export const currency = (number: any) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(number);

};
export const getShortName = (user: any) => {
    let name = '';
    if (user.firstName) {
        name = name + user.firstName.charAt(0).toUpperCase();
    }
    if (user.lastName) {
        name = name + user.lastName.charAt(0).toUpperCase();
    }
    return name;
}

export const getArray = (num: any = 24) => {
    var arr = Array.from({ length: num }, (_, i) => i + 1) || []
    return arr
}

export const testImage = (url: any) => {

    return new Promise((resolve) => {
        const img = new Image();

        img.src = url;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
}
export const getActiveRoute = (path: any, str: any) => {
    //let str = window.location.pathname;
    let strArr = str.split('/');
    if (str.length === 1 || str.length === 2 || strArr.includes("appointments") || strArr.includes("prescriptions") || strArr.includes("labreports")) {
        return path === 'file' ? 'active' : '';
    }
    else if (str.length > 2 && strArr.includes("orders")) {
        return path === 'orders' ? 'active' : '';
    }
    else if (str.length > 2 && strArr.includes("coverage")) {
        return path === 'coverage' ? 'active' : '';
    }
}
export const getAllSpIcons = () => {
    return [
        {
            "name": "Cardiologist",
            "isseasonal": null
        },
        {
            "name": "General Physician",
            "isseasonal": null
        },
        {
            "name": "Oncology",
            "isseasonal": null
        },
        {
            "name": "Occupational Therapy",
            "isseasonal": null
        },
        {
            "name": "Orthopaedician/ Rheumatologist",
            "isseasonal": null
        },
        {
            "name": "Otorhinolaryngology",
            "isseasonal": null
        },
        {
            "name": "Pathology",
            "isseasonal": null
        },
        {
            "name": "Pediatric Surgery",
            "isseasonal": null
        },
        {
            "name": "Pediatrics",
            "isseasonal": null
        },
        {
            "name": "Physical Medicine & Rehabilitation",
            "isseasonal": null
        },
        {
            "name": "Plastic Surgery",
            "isseasonal": null
        },
        {
            "name": "Psychiatry",
            "isseasonal": null
        },
        {
            "name": "Chest/Pulmonologist",
            "isseasonal": null
        },
        {
            "name": "Radiation Oncology",
            "isseasonal": null
        },
        {
            "name": "Rheumatology",
            "isseasonal": null
        },
        {
            "name": "Sleep Medicine",
            "isseasonal": null
        },
        {
            "name": "Sports Medicine",
            "isseasonal": null
        },
        {
            "name": "Surgery",
            "isseasonal": null
        },
        {
            "name": "Urologist",
            "isseasonal": null
        },
        {
            "name": "Vascular Surgery",
            "isseasonal": null
        },
        {
            "name": "Gynaecology",
            "isseasonal": null
        },
        {
            "name": "Consultant Physician",
            "isseasonal": null
        },
        {
            "name": "ENT Specialist",
            "isseasonal": null
        },
        {
            "name": "General Practitioner",
            "isseasonal": null
        },
        {
            "name": "Ophthalmologist",
            "isseasonal": null
        },
        {
            "name": "Paediatrician",
            "isseasonal": null
        },
        {
            "name": "Hematology",
            "isseasonal": null
        },
        {
            "name": "Anesthesiology",
            "isseasonal": null
        },
        {
            "name": "Cardiothoracic Surgery",
            "isseasonal": null
        },
        {
            "name": "Dentist",
            "isseasonal": null
        },
        {
            "name": "Dermatologist",
            "isseasonal": null
        },
        {
            "name": "Diagnostic Radiology",
            "isseasonal": null
        },
        {
            "name": "Emergency Medicine",
            "isseasonal": null
        },
        {
            "name": "Endocrinologist/Diabetologist",
            "isseasonal": null
        },
        {
            "name": "Family Medicine",
            "isseasonal": null
        },
        {
            "name": "Gastroenterologist",
            "isseasonal": null
        },
        {
            "name": "General Surgeon",
            "isseasonal": null
        },
        {
            "name": "Geriatric Medicine",
            "isseasonal": null
        },
        {
            "name": "Allergy & Immunology",
            "isseasonal": null
        },
        {
            "name": "Infectious Disease",
            "isseasonal": null
        },
        {
            "name": "Intensive Care",
            "isseasonal": null
        },
        {
            "name": "Internal Medicine",
            "isseasonal": null
        },
        {
            "name": "Interventional Cardiology",
            "isseasonal": null
        },
        {
            "name": "Interventional Radiology",
            "isseasonal": null
        },
        {
            "name": "Medical Genetics",
            "isseasonal": null
        },
        {
            "name": "Nephrologist",
            "isseasonal": null
        },
        {
            "name": "Neurologist",
            "isseasonal": null
        },
        {
            "name": "Neurosurgery",
            "isseasonal": null
        },
        {
            "name": "Nuclear Medicine",
            "isseasonal": null
        },
        {
            "name": "Obstetrics & Gynecology",
            "isseasonal": null
        }
    ]
}