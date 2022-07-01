import React from 'react'

const TopTotal = (props) => {
  const { listMessage, listQnAs } = props

  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-danger">
              <i className="text-danger icon fas fa-comment-plus"></i>
            </span>
            <div className="text-danger">
              <h6 className="mb-1">Số câu hỏi mới </h6>
              {listMessage ? <span>{listMessage.length}</span> : <span>0</span>}
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-success">
              <i className="text-sucess icon fas fa-question"></i>
            </span>
            <div className="text-success">
              <h6 className="mb-1">Số câu hỏi đã có</h6>
              {listQnAs ? <span>{listQnAs.length}</span> : <span>0</span>}
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}

export default TopTotal
