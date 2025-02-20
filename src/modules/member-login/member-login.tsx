import { memberSignIn } from "@app/@services";
import { Button, Header, Radio } from "@app/components";
import React from "react";
import { DetailsContainer, RadioGroup, SubTitle, Title } from "../forget-pin/forgot-pin-components";
import LoginSuccess from "../login/login-success";

export default function MemberLogin() {
    const [selectedOption, setSelectedOption] = React.useState('PHONE');
    const [radioOptions, setRadioOptions] = React.useState<any>([]);
    const [loginSuccess,SetLoginSuccess] = React.useState(false);
    function onClick() {
        console.log('onClick');
        memberSignIn({"svassUserId" : selectedOption}).then((res: any) => {
            console.log(res);
            SetLoginSuccess(true);
            if(res.status == 200){
                setTimeout(() => {
                    window.location.href = `${process.env.REACT_APP_HOMEPAGE}/`
                }, 2000);
            }
            else if (res.status == 400) {
                // setInvalidOtp(res.data.message);
                // setUIdErr(res.data.message);
            }
        })

    }
    React.useEffect(() => {
        SetLoginSuccess(false);
        let uDetails = localStorage.getItem('myUserDetails');
        if (uDetails) {
            setRadioOptions(uDetails ? JSON.parse(uDetails) : []);
            let userDetails = JSON.parse(uDetails);
            setSelectedOption(userDetails[0].svassUserId);
        }

    }, [])
    return (
        <>{!loginSuccess ? (
            <>
            <Header isSignup />
            <Title>{'Select Member ID to Login'}</Title>
            <DetailsContainer>
                <>
                    <SubTitle>Member ID</SubTitle>
                    <RadioGroup>
                        {radioOptions.map((opt: any, index: number) => (
                            <Radio
                                selected={selectedOption}
                                label={opt.opdId}
                                name={'selOpt'}
                                type='radio'
                                onChange={(ev) => setSelectedOption(opt.svassUserId)}
                                value={opt.svassUserId}>
                                {opt.opdId + "-" + opt.firstName + " " + opt.lastName}
                            </Radio>
                        ))
                        }

                    </RadioGroup>
                </>
                <Button variant={'primary'} onClick={onClick}>
                    {'Login'}
                </Button>
            </DetailsContainer>
            </>) : (
				<LoginSuccess />
			)}
        </>)
}
