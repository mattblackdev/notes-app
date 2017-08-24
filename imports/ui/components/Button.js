import styled from 'styled-components'

export default Button = styled.button`
  border: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  background-color: #6272a4;
  font-size: 16px;
  line-height: 1.2;
  padding: .3rem .5rem;
  color: #f8f8fe;
  cursor: pointer;
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
`