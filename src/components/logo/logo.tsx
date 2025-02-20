import React from 'react'
import {
    Logo,SmLogo

} from './logos'

export const iconNames = {
    logo: Logo,
    smLogo: SmLogo,

}

export type IconProps = {
    name: keyof typeof iconNames
}

export default function Icon({ name }: IconProps) {
    const IconComponent = iconNames[name]
    return <IconComponent />
}
