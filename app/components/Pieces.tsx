"use client"

import React from 'react'

interface PieceProps extends React.SVGProps<SVGSVGElement> {
    side: 'white' | 'black'
    className?: string
}

export const Pawn = ({ side, className, ...props }: PieceProps) => {
    const fill = side === 'white' ? '#fff' : '#000'
    const stroke = side === 'white' ? '#000' : '#fff'
    return (
        <svg viewBox="0 0 45 45" className={className} {...props}>
            <path
                d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"
                fill={fill}
                stroke={stroke}
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    )
}

export const Rook = ({ side, className, ...props }: PieceProps) => {
    const fill = side === 'white' ? '#fff' : '#000'
    const stroke = side === 'white' ? '#000' : '#fff'
    return (
        <svg viewBox="0 0 45 45" className={className} {...props}>
            <g fill={fill} stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 39h27v-3H9v3zM12 36v-4h21v4M11 14V9h4v2h5V9h5v2h5V9h4v5" strokeLinecap="butt" />
                <path d="M34 14l-3 3H14l-3-3" />
                <path d="M31 17v12.5H14V17" strokeLinecap="butt" strokeLinejoin="miter" />
                <path d="M31 29.5l1.5 2.5h-20l1.5-2.5" />
                <path d="M11 14h23" fill="none" strokeLinejoin="miter" />
            </g>
        </svg>
    )
}

export const Knight = ({ side, className, ...props }: PieceProps) => {
    const fill = side === 'white' ? '#fff' : '#000'
    const stroke = side === 'white' ? '#000' : '#fff'
    return (
        <svg viewBox="0 0 45 45" className={className} {...props}>
            <g fill={fill} stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" />
                <path d="M24 18c.38 2.32-2.41 2.64-3 5V18h3zM9.5 25.5A4.5 4.5 0 1 1 15 29V25.5h-5.5zm-1.6 5.8c.84-.7 1.8-1.2 2.6-1.3" />
            </g>
        </svg>
    )
}

export const Bishop = ({ side, className, ...props }: PieceProps) => {
    const fill = side === 'white' ? '#fff' : '#000'
    const stroke = side === 'white' ? '#000' : '#fff'
    return (
        <svg viewBox="0 0 45 45" className={className} {...props}>
            <g fill={fill} stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <g transform="translate(0, 1)">
                    <path d="M9 36c3.39-.97 9.11-1.45 13.5-1.45 4.38 0 10.11.48 13.5 1.45V34h-27v2z" />
                    <path d="M15 32c2.5 1.29 10.5 1.25 15 0" />
                    <path d="M22.5 32v-2.5" />
                    <path d="M15 24c5.5-1.5 9-6.5 9-6.5s3.5 5 9 6.5" />
                    <path d="M22.5 10c-5.5 0-9 2.5-9 7.5V24h18v-6.5c0-5-3.5-7.5-9-7.5z" />
                    <path d="M22.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path d="M22.5 26v4M19 14h6" />
                </g>
            </g>
        </svg>
    )
}

export const Queen = ({ side, className, ...props }: PieceProps) => {
    const fill = side === 'white' ? '#fff' : '#000'
    const stroke = side === 'white' ? '#000' : '#fff'
    return (
        <svg viewBox="0 0 45 45" className={className} {...props}>
            <g fill={fill} stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM10.5 20.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM38.5 20.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25L7 14l2 12z" />
                <path d="M9 26c0 2 1.5 2 2.5 4 1 2.5 1 2.5.5 4-1.5 2.5-2 2.5-1.5 5.5" />
                <path d="M36 26c0 2-1.5 2-2.5 4-1 2.5-1 2.5-.5 4 1.5 2.5 2 2.5 1.5 5.5" />
                <path d="M9 39.5c9 2.5 18 2.5 27 0" />
                <path d="M11 39.5c8 1.5 17 1.5 23 0" fill="none" />
            </g>
        </svg>
    )
}

export const King = ({ side, className, ...props }: PieceProps) => {
    const fill = side === 'white' ? '#fff' : '#000'
    const stroke = side === 'white' ? '#000' : '#fff'
    return (
        <svg viewBox="0 0 45 45" className={className} {...props}>
            <g fill={fill} stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.5 11.63V6M20 8h5" />
                <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" />
                <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-5 5.5-5 5.5l-6 6-4-1.5-4 1.5-6-6s-1-6.5-5-5.5c-3 6 6 10.5 6 10.5v7z" />
                <path d="M11.5 30c5.5-3 15.5-3 21 0M11.5 33.5c5.5-3 15.5-3 21 0M11.5 37c5.5-3 15.5-3 21 0" />
            </g>
        </svg>
    )
}

export const getPieceComponent = (type: string, side: 'white' | 'black') => {
    switch (type.toLowerCase()) {
        case 'p': return Pawn
        case 'r': return Rook
        case 'n': return Knight
        case 'b': return Bishop
        case 'q': return Queen
        case 'k': return King
        default: return null
    }
}
