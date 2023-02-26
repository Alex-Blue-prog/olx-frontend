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
            padding: 10px;
        }

        .adImage {
            width: 320px;
            /* height: 320px; */
            display: flex;
            align-items: center;
            background-color: #ccc;
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
        .adInfo {
            flex: 1;
    

            .adName {
                margin-bottom: 20px;

                h2 {
                    margin-top: 0px;
                }

                small {
                    color: #999;
                }
            }
            .adDescription {
                font-size: 0.9rem;
                line-height: 1.4rem;
                small {
                    color: #999;
                }
            }
        }
    }

    .rightSide {
        width: 250px;

        .price span {
            color: #49aeef;
            display: block;
            font-size: 27px;
            font-weight: bold;
        }

        .contactSellerLink {
            background-color: #49aeef;
            color: #fff;
            height: 30px;
            border-radius: 5px;
            box-shadow: 0px 0px 4px #999;
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            margin-bottom: 20px;
        }

        .createBy small {
            display: block;
            color: #999;
            margin-top: 10px;
        }
    }
`;

//bottom area with the list of products(ads)
export const OthersArea = styled.div`
    margin-bottom: 20px;

    h2 {
        font-size: 20px;
    }

    .list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;

        .aditem .itemImg {
            height: 200px;
        }
    }
`;

export const BreadCrumb = styled.div`
    font-size: 13px;
    margin-top: 20px;

    a, span {
        display: inline-block;
        margin: 0 5px;
        color: #49aeef;
        text-decoration: none;
    }
`;