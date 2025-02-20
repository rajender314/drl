import { Spinner } from '@app/components/icon/icons';
import React from 'react';
import {
	Container,
	ErrorMessage,
	Header,
	Loader,
} from './lab-report-components';
import { wwwCorseIssue } from '@app/utils';
type Props = {
	pdfLink: string;
	errorMsg?: string;
	onError?: (e: any) => void;
};
export default function PdfReport({ pdfLink, onError, errorMsg }: Props) {
	
	const [pdfLinkNew, setPDFLinkNew] = React.useState((wwwCorseIssue(pdfLink)));
	//console.log(pdfLinkNew)
	const [isError, setIsError] = React.useState(false);
	const [loading, setLoading] = React.useState(true);
	const [pageCount, setPageCount] = React.useState();
	const windowObj: any = window;
	React.useEffect(() => {
		isPdf().then((res) => {
			loadPdf();
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	//https://stackoverflow.com/questions/16480469/how-to-display-whole-pdf-not-only-one-page-with-pdf-js
	const toCanvas = (pdf: any, pageNo: number, pageCount: number) => {
		// console.log('pageNo is' + pageNo)
		// console.log('pageCount is' + pageCount)
		// console.log(pdf);
		pdf.getPage(pageNo).then(function (page: any) {
			if (page) {
				var scale = 1.2;
				var viewport = page.getViewport({ scale: scale });
				// Prepare canvas using PDF page dimensions
				var canvas: any = document.getElementById('canvas' + pageNo);
				var context = canvas.getContext('2d');
				canvas.height = viewport.height;
				canvas.width = viewport.width;
				// Render PDF page into canvas context
				var renderContext = {
					canvasContext: context,
					viewport: viewport,
				};
				var renderTask = page.render(renderContext);
				// console.log('current page is: ' + pageNo)
				renderTask.promise.then(function () {
					page = null;
					setLoading(false);
				});

				if (page && pageNo < pageCount && pageNo < 12) {
					// console.log('load next item')
					let newPage = pageNo + 1
					toCanvas(pdf, newPage, pageCount)
				} else {
					setLoading(false);
				}
			} else {
				setLoading(false);
			}
			// renderTask.promise.then(function () {
			// 	setLoading(false);
			// });
		});
	}
	function loadPdf() {
		setTimeout(() => {
			let pdfjsLib: any = windowObj['pdfjs-dist/build/pdf'];
			pdfjsLib.GlobalWorkerOptions.workerSrc =
				'//mozilla.github.io/pdf.js/build/pdf.worker.js';
			var loadingTask = pdfjsLib.getDocument(pdfLinkNew);
			loadingTask.promise.then(
				function (pdf: any) {
					var pageNumber = 1;
					setPageCount(pdf.numPages);
					toCanvas(pdf, 1, pdf.numPages)
				},
				function (reason: any) {
					// PDF loading error
					console.error(reason);
					setIsError(true);
				}
			);
		}, 500);
	}
	async function isPdf() {
		var ext = pdfLinkNew.substring(pdfLinkNew.lastIndexOf('.') + 1);
		if (onError) {
			if (ext === 'pdf') {
				setIsError(false);
				onError(false);
				return true;
			} else {
				setIsError(true);
				onError(true);
				return false;
			}
		} else {
			return true;
		}
	}
	return (
		<Container>
			{/* =={pageCount} */}
			{isError ? (
				<ErrorMessage>{errorMsg ? errorMsg : 'Failed to load PDF'}</ErrorMessage>
			) : (
				<>
					{loading && (
						<Loader>
							<Spinner size='3px' />
						</Loader>
					)}
					{/* <canvas id='the-canvas'></canvas> */}
					{new Array(pageCount).fill(null).map((p, i) => <canvas id={`canvas${i + 1}`}></canvas>)}
				</>
			)}
		</Container>
	);
}
