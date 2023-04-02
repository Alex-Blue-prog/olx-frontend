import styled from "styled-components";

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

            .imgContainer {
                background-color: #ddd;
                height: 200px;
                border-radius: 5px;
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