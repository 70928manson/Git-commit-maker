import { useState } from 'react'

import './App.css'

import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';


function App() {
  const [value, setValue] = useState('');

  console.log("value", value, setValue);
  

  return (
    <div>
      <h1>Git Commit Maker</h1>
      {/* 下拉選單選類型 */}
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Select className="bg-dark text-white" aria-label="Default select example">
            <option>請選擇 Git Commit Type</option>
            <option value="feat">feat</option>
            <option value="modify">modify</option>
            <option value="fix">fix</option>
            <option value="docs">docs</option>
            <option value="refactor">style</option>
            <option value="refactor">refactor</option>
            <option value="perf">perf</option>
            <option value="test">test</option>
            <option value="chore">chore</option>
            <option value="revert">revert</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          {/* <Form.Label>標題 Title</Form.Label> */}
          <Form.Control className="bg-dark text-white" type="text" placeholder="請輸入 Git 標題" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          {/* <Form.Label>Example textarea</Form.Label> */}
          <Form.Control className="bg-dark text-white" as="textarea" rows={5} placeholder="問題描述" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          {/* <Form.Label>Example textarea</Form.Label> */}
          <Form.Control className="bg-dark text-white" type="text" placeholder="Resolves: #" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          {/* <Form.Label>Example textarea</Form.Label> */}
          <Form.Control className="bg-dark text-white" type="text" placeholder="See also: #" />
        </Form.Group>
      </Form>

      <div className="d-grid gap-2">
        <Button variant="primary" size="lg">建立 Commit</Button>
      </div>
      

      <h2>Commit :</h2>
      <Form.Control className="white-placeholder mb-3 bg-dark text-white"  as="textarea" disabled rows={5} placeholder="產生的 commit 訊息" />
      <div className="d-grid gap-2">
        <Button variant="primary" size="lg">點我複製</Button>
      </div>

      <p className="read-the-docs">
        70928manson | ming1995
      </p>
    </div>
  )
}

export default App
