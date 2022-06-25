import React from "react"

type SetText = {
    setText(str: string): void
}

function InputSignText({ setText }: SetText) {
    return <div>InputSignText</div>
}

export default InputSignText
