import React from 'react'
import Skeleton from 'react-loading-skeleton'
export default function CardSkeleton() {
    return <>
        <div className="col-md-3 gy-4">
          <div className='card  mx-auto' style={{ width: '19rem', height: '19rem' }}>
            <Skeleton height={'11rem'} className='mb-4' />
            <h4><Skeleton /></h4>
            <h5><Skeleton /></h5>
            <p><Skeleton /></p>
          </div>
        </div>










    </>

}
