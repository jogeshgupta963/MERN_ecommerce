import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function PaginatePage({ pages, page, isAdmin = false, keyword = '' }) {
  let active = page
  let items = []
  for (let number = 1; number <= pages; number++) {
    items.push(
      <LinkContainer
        key={number}
        to={
          !isAdmin
            ? keyword
              ? `/search/${keyword}/page/${number}`
              : `/page/${number}`
            : `/admin/all-products/page/${number}`
        }
      >
        <Pagination.Item active={number === active}>{number}</Pagination.Item>
      </LinkContainer>,
    )
  }
  return (
    <div>
      {/* <Pagination size="sm">
        {[...Array(pages).keys()].map((pageNumber) => {
          ;<LinkContainer
            key={pageNumber + 1}
            to={
              keyword
                ? `/search/${keyword}/page/${pageNumber + 1}`
                : `/page/${pageNumber + 1}`
            }
          >
            ;
            <Pagination.Item active={page === pageNumber + 1}>
              {pageNumber + 1}
            </Pagination.Item>
          </LinkContainer>
        })}
      </Pagination> */}
      <Pagination size="lg">{items}</Pagination>
    </div>
  )
}

export default PaginatePage
