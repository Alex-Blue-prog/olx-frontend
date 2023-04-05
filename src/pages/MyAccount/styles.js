import styled, { keyframes } from "styled-components";

const op = keyframes`
    to {
        opacity: 1;
    }
`;

export const PageArea = styled.div`

    form {
        background-color: #fff;
        border-radius: 3px;
        padding: 10px;
        box-shadow: 0px 0px 3px #999;

        .wrapper {
            max-width: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .loading {
                background: red;
                display: flex;
                justify-content: center;
            }

            div {
                width: 100%;
                padding: 5px;
                display: flex;
                align-items: center;

                label {
                    width: 200px;
                    text-align: right;
                    font-size: 14px;
                    padding-right: 20px;
                    font-weight: bold;
                }

                .inputDiv {
                    flex: 1;

                    input, select {
                        width: 100%;
                        font-size: 14px;
                        padding: 5px;
                        border: 1px solid gray;
                        border-radius: 3px;
                        outline: 0;
                        transition: all ease .4s;

                        &:focus {
                            border: 1px solid #0089ff;
                            color: #333;
                        
                        }

                    }

                    button {
                        background-color: #0089ff;
                        border: 0;
                        outline: 0;
                        padding: 5px 10px;
                        border-radius: 4px;
                        color: #fff;
                        font-size: 15px;
                        cursor: pointer;
                    }
                }
            }
        }

        
    }

    .list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
       
        .adItem {
            /* height: 300px; */
            border: 1px solid #ccc;
            text-decoration: none;
            padding: 10px;
            border-radius: 5px;
            color: #000;

            display: flex;
            flex-direction: column;

            .modal {
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                max-width: 500px;
                width: 100%;
                min-height: 500px;
                overflow-y: auto;
                border-radius: 4px;
                border: 2px solid #999;
                background: #fff;
                z-index: 1999;
                opacity: 0;
                animation: ${op} 250ms linear 1;
                animation-fill-mode: forwards;
                display: flex;
                flex-direction: column;
                padding: 25px;

                label {
                    margin-bottom: 10px;

                    input, select, textarea {
                        width: 100%;
                        padding: 4px;
                        outline: none;
                        border: 1px solid #999;

                        &:focus {
                            border: 1px solid #0089ff;
                        }
                    }

                    textarea {
                        resize: none;
                        height: 60px;
                    }

                   
                }
            }

      

            .blackScreen {
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: #000;
                opacity: 0.4;
            }

            .imgContainer {
                background-color: #ddd;
                height: 200px;
                border-radius: 5px;
                position: relative;

                .leftIcon, .rightIcon {
                    height: 32px;
                    width: 32px;
                    border: 2px solid #49aeef;
                    background-color: #fff;
                    opacity: .7;
                    z-index: 999;
                    position: absolute;
                    top: calc(50% - 16px);
                    cursor: pointer;
                    border-radius: 50%;

                    &:hover {
                        opacity: 1;
                    }
                }

                .leftIcon {
                    left: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    
                    div {
                        margin-left: -12px;
                        border: 8px solid;
                        z-index: 999;
                        border-color: transparent #49aeef transparent transparent;
                    }
                }
                .rightIcon {
                    right: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    
                    div {
                        margin-right: -12px;
                        border: 8px solid;
                        z-index: 999;
                        border-color: transparent transparent transparent #49aeef;
                    }
                }
            }

            .imgContainer img {
                width: 100%;
                height: 100%;
                border-radius: 5px;
                object-fit: cover;
            }

            .adItemInfo {
                margin: 5px 0;
                font-size: 14px;
            }

            button {
                padding: 5px 0;
                margin-top: 10px;
                cursor: pointer;
                background: #0089ff;
                border: none;
                color: #fff;
                border-radius: 5px;
                outline: none;
                font-size: 15px;
            }
        }
    }
`;