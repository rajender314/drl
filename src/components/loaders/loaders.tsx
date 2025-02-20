import ContentLoader, { Code } from "react-content-loader"
import {
    Container,
    PrescriptionContainer,
    LabContainer,
} from './loader-components'

export const DoctorCardLoader = (props: any) => (
    <Container>
        <ContentLoader
            speed={2}
            width={320}
            height={150}
            viewBox="0 0 320 150"
            backgroundColor="#FFF"
            foregroundColor="#cdcff1"
            {...props}
        >

            <circle cx="65" cy="75" r="55" />
            <rect x="140" y="20" rx="5" ry="5" width="150" height="20" />
            <rect x="140" y="45" rx="2" ry="2" width="100" height="10" />
            <rect x="140" y="65" rx="5" ry="5" width="30" height="30" />
            <rect x="180" y="70" rx="5" ry="5" width="100" height="15" />
            <rect x="140" y="105" rx="10" ry="10" width="120" height="20" />
        </ContentLoader>
    </Container>

)
export const PrescriptionCardLoader = (props: any) => (
    <PrescriptionContainer>
        <ContentLoader
            speed={2}
            width={320}
            height={90}
            viewBox="0 0 320 90"
            backgroundColor="#e1e1e1"
            foregroundColor="#cdcff1"
            {...props}
        >

            <rect x="20" y="20" rx="5" ry="5" width="30" height="30" />
            <rect x="60" y="20" rx="5" ry="5" width="50" height="15" />
            <rect x="60" y="45" rx="2" ry="2" width="80" height="12" />
            <rect x="180" y="20" rx="2" ry="2" width="80" height="12" />
            <rect x="180" y="40" rx="5" ry="5" width="120" height="12" />
        </ContentLoader>
    </PrescriptionContainer>

)
export const LabReportCardLoader = (props: any) => (
    <LabContainer>
        <ContentLoader
            speed={2}
            width={320}
            height={90}
            viewBox="0 0 320 90"
            backgroundColor="#e1e1e1"
            foregroundColor="#cdcff1"
            {...props}
        >
            <circle cx="40" cy="40" r="20" />
            <rect x="80" y="20" rx="5" ry="5" width="150" height="15" />
            <rect x="80" y="45" rx="2" ry="2" width="120" height="12" />

        </ContentLoader>
    </LabContainer>

)
export const CoverageCardLoader = (props: any) => (
    <PrescriptionContainer>
        <ContentLoader
            speed={2}
            width={320}
            height={90}
            viewBox="0 0 320 90"
            backgroundColor="#e1e1e1"
            foregroundColor="#cdcff1"
            {...props}
        >

            <rect x="20" y="20" rx="5" ry="5" width="30" height="30" />
            <rect x="60" y="20" rx="5" ry="5" width="50" height="15" />
            <rect x="60" y="45" rx="2" ry="2" width="80" height="12" />
            <rect x="180" y="20" rx="2" ry="2" width="80" height="12" />
            <rect x="180" y="40" rx="5" ry="5" width="120" height="12" />
        </ContentLoader>
    </PrescriptionContainer>

)

export const CodeLoader = () => {
    return <Code
        width={100}
        height={100}
        viewBox="0 0 100 100"
        style={{ width: '100%' }}
    />
}
