import styled from "styled-components";








const Cards = (props) => {
    return (
        <Div>
            {props.children}
        </Div>
    )
}

const Div = styled.div`   
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    position: relative;
`
export { Cards }