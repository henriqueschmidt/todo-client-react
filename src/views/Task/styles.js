import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Form = styled.div`
    height: 50%;
    margin-bottom: 70px;
`

export const TypeIcons = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    .inative {
        opacity: 0.5;
    }

    button {
        border: none;
        background: none;
        outline:none;
    }

    img {
        width: 50px;
        height: 50px;
        margin: 10px;

        cursor: pointer;

        &:hover {
            opacity: 0.5;
        }
    }
`


export const Input = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    
    span {
        color: #707070;
        margin-bottom: 5px;
    }

    input {
        font-size: 16px;
        padding: 20px;
        margin: 10px 0;
        border: none;
        border-bottom: 1px solid #ee6b26;
    }

    img {
        width: 20px;
        height: 20px;
        position: relative;
        left: 95%;
        bottom: 37px;
        
    }

`

export const TextArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 20px 0;

    span {
        color: #707070;
        margin: 5px 0;
    }

    textarea {
        font-size: 16px;
        padding: 15px;
        border: none;
        border: 1px solid #ee6b26;
    }

`

export const Options = styled.div`
    display: flex;
    justify-content: space-between;
    
    button {
        font-weight: bold;
        color: #20295f;
        border: none;
        background: none;
        font-size: 18px;
        cursor: pointer;

        &:hover{
            opacity: 0.7;
        }
    }

    div {
        display: flex;
        align-items: center;
        font-weight: bold;
        color: #ee6b26;
        font-size: 18px;

    }
`

export const Save = styled.div`
    width: 100%;
    margin-top: 20px;

    button {
        width: 100%;
        background: #ee6b26;
        border: none;
        font-size: 20px;
        color: #fff;
        font-weight: bold;
        padding: 20px;
        border-radius: 30px;
        cursor: pointer;
        outline: none !important;

        &:hover {
            opacity: 0.5;
        }
    }

`
