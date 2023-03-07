import styled from "styled-components";


export const PageArea = styled.div`
    display: flex;
    margin-top: 20px;

    .leftSide {
        width: 250px;
        margin-right: 10px;

        .filterName {
            font-size: 15px;
            margin: 10px 0;
        }

        input, select {
            width: 100%;
            height: 40px;
            border: 2px solid #9bb83c;
            border-radius: 5px;
            outline: none;
            font-size: 15px;
            color: #000;
            padding: 10px;
        }

        ul, li {
            padding: 0;
            margin: 0;
            list-style: none;
        }

        .categoryItem {
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 5px;
            color: #000;
            cursor: pointer;
            margin-bottom: 5px;

            img {
                margin-right: 5px;
                width: 25px;
                height: 25;
            }
            span {
                font-size: 14px;
            }
        }

        .categoryItem:hover, 
        .categoryItem.active {
            background-color: #9bb83c;
            color: #fff;
        }
    }

    .rightSide {
        flex: 1;

        h2 {
            margin: 0;
            margin-bottom: 20px;
            font-size: 18px;
        }

        .list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
            /* grid-auto-rows: minmax(150px, 1fr); */
            gap: 20px;
            
        }

        .listWarning {
            text-align: center;
            margin-top: 40px;
        }

        /* pagination scroll section */
        .paginationWrapper {
            position: relative;
            width: 440px;
            margin: 40px auto 20px auto;

            .right, .left {
                position: absolute;
                top: calc(50% - 10px);
                cursor: pointer;
            }

            .left {
                left: 0;
                border: 10px solid;
                border-color: transparent #9bb83c transparent transparent;
            }

            .right {
                right: 0;
                border: 10px solid;
                border-color: transparent transparent transparent #9bb83c;
            }

        }

        .paginationContainer {
            overflow-x: hidden;
            max-width: 370px;
            width: fit-content;
            margin: 0 auto;
            position: relative;

           
            .pagination {
                display: flex;

                .pageItem {
                    min-width: 30px;
                    height: 30px;
                    border: 1px solid #000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    margin: 0 2.5px;
                    border-radius: 5px;
                    cursor: pointer;

                    &:hover {
                        border: 1px solid #999;
                    }

                    &.active {
                        background-color: #9bb83c;
                        color: #fff;
                        /* border: 1px solid #9bb83c; */
                    }
                }

            }
        }

        
    }
`;