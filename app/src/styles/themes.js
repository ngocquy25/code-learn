import { css, createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#fff",
  fontColor: "#000",
};

export const darkTheme = css`
.Resizer {
    background: #000;
    opacity: 0.1;
    z-index: 1;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -moz-background-clip: padding;
    -webkit-background-clip: padding;
    background-clip: padding-box;
}

.Resizer:hover {
    -webkit-transition: all 2s ease;
    transition: all 2s ease;
}

.Resizer.horizontal {
    height: 10px;
    margin: -5px 0;
    border-top: 5px solid rgba(255, 255, 255, 0);
    border-bottom: 5px solid rgba(255, 255, 255, 0);
    cursor: row-resize;
    width: 100%;
}

.Resizer.horizontal:hover {
    border-top: 5px solid rgba(255, 255, 255, 0.5);
    border-bottom: 5px solid rgba(255, 255, 255, 0.5);
}

.Resizer.vertical {
    width: 20px;
    margin: 0 -10px;
    border-left: 5px solid rgba(255, 255, 255, 0);
    border-right: 5px solid rgba(255, 255, 255, 0);
    cursor: col-resize;
}

.Resizer.vertical:hover {
    border-left: 5px solid rgba(0, 0, 0, 0.5);
    border-right: 5px solid rgba(0, 0, 0, 0.5);
}
.Resizer.disabled {
    cursor: not-allowed;
}
.Resizer.disabled:hover {
    border-color: transparent;
}

.page {
    padding-top: 10px;
}

#paginate {
    margin: 0 4px;
    border-radius: 3px;
    background-color: #000;
    border-color: #000;
    color: white;
}

#paginate-active {
    margin: 0 4px;
    border-radius: 3px;
    background-color: white;
    border-color: white;
    color: black;
}

#paginate:hover:not(.active) {
    background-color: rgb(70, 70, 70);
    border-color: rgb(70, 70, 70);
}

.problem {
    text-align: left;
    padding: 20px 50px;
    background-color: white;
    height: 100%;
    overflow-y: scroll;
}

.right {
    margin-left: 5px;
}

.testcase {
    color: white;
    height: 100%;
    background-color: rgb(20, 20, 20);
}

.quest-title {
    font-size: 30px;
    margin-bottom: 20px;
}

.quest-content {
    font-size: 16px;
    white-space: pre-wrap;
}

#testcase-title {
    background-color: rgb(34, 34, 34);
    height: 70px;
    align-items: center;
    padding: 15px;
}

.testname {
    font-size: 18px;
    font-weight: 500;
    float: left;
    margin-top: 6px;
}

#btn-run {
    float: right;
}

#test-content {
    line-height: 1.5em;
    height: 100%;
    overflow-y: scroll;
    font-size: 14px;
}

.field {
    font-size: 16px;
    font-weight: 400;
    color: rgb(250, 250, 250);
    padding: 10px;
}

.content {
    font-size: 16px;
    white-space: pre-wrap;
    padding: 10px;
}

.flex-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}
`

export const GlobalStyles = createGlobalStyle`

	body {

		background-color: ${(props) => props.theme.body};

	}

`;