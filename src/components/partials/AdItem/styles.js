import styled from "styled-components";

export const Item = styled.div`
    a {
        display: block;
        border: 1px solid #ccc;
        /* margin: 10px; */
        text-decoration: none;
        padding: 10px;
        border-radius: 5px;
        color: #000;

        .itemImg {
            background-color: #ddd;
            height: 200px;
            border-radius: 5px;
        }

        .itemImg img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
            object-fit: cover;
        }

        .itemName {
            margin: 20px 0 5px;
            font-weight: bold;
        }
    }

`;