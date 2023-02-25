import styled from "styled-components";

export const Fake = styled.div`
    background-color: #ddd;
    filter: brightness(90%);
    height: 30px;
    height: ${props => props.height ?? 20}px;
    border-radius: 5px;
`;

export const PageArea = styled.div`
    display: flex;
    margin-top: 20px;

    .box {
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 4px #999;
        margin-bottom: 20px;
    }

    .box--padding {
        padding: 10px;
    }

    .leftSide {
        flex: 1;
        margin-right: 20px;

        .box {
            display: flex;
            padding: 5px;
        }

        .adImage {
            width: 320px;
            /* height: 320px; */
            display: flex;
            align-items: center;
            background-color: #ddd;
            border-radius: 5px;
            margin-right: 20px;
            overflow: hidden;
            position: relative; 

            .slide {
                display: flex;
                height: 320px;
                width: fit-content;
                transition: all linear 500ms;
                /* width: calc(-100% * ${props => props.imgTotal}); */

                .slideItem {
                    /* flex: 1; */
                    width: 320px;
                    height: 320px;

                    img {
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                    }
                }
            }

            .leftIcon, .rightIcon {
                height: 32px;
                width: 32px;
                border: 2px solid #49aeef;
                background-color: #fff;
                opacity: .7;
                z-index: 999;
                position: absolute;
                top: calc(50% - 15px);
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
        .adInfo {
            flex: 1;
    

            .adName {
                margin-bottom: 20px;

                h2 {
                    margin-top: 20px;
                }

                small {
                    color: #999;
                }
            }
            .adDescription {

                small {
                    color: #999;
                }
            }
        }
    }

    .rightSide {
        width: 250px;
    }
`;