/*
 * @Descripttion: test
 * @Date: 2021-05-08 20:59:19
 * @LastEditors: love-coding
 * @LastEditTime: 2021-05-08 21:20:55
 */
import styled from '@emotion/styled';

export const Row = styled.div<{
    gap?: number | boolean;
    between?: boolean,
    marginBottom?: number
}>`
    display: flex;
    align-items: center;
    justify-content: ${props=> props.between? 'space-between':undefined};
    margin-bottom: ${props=> props.marginBottom+'rem'};
    > * {
        margin-top: 0!important;
        margin-bottom: 0!important;
        margin-right: ${props=> typeof props.gap=== 'number'?props.gap + 'rem':props.gap?'2rem':undefined};
    }
`