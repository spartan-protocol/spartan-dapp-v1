import React, { useEffect, useState,  } from 'react'

import { AllocationTable } from '../components/allocationTable'

import '../../App.less'
import { Card, Row, Col } from 'antd'

const Allocations = () => {

	const [safari, setSafari] = useState(null)
	const [loaded, setLoaded] = useState(false)


	useEffect(() => {
		var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
		setSafari(isSafari)
		let pathname = window.location.pathname.split("/")[1]
		if (pathname === 'burn' && !loaded) {
			setLoaded(true)
		}
		// eslint-disable-next-line
	}, [])


	return (
		<>
		<Row gutter={[16, 16]} type="flex" justify="center">
			<Col xs={24}>
				<Card>
					<h1 style={{ fontSize: 48}}>ALLOCATION TABLE</h1>
					<h2>30 BINANCE SMART CHAIN TOKENS BURNING FOR SPARTA</h2>
				</Card>
			</Col>
		</Row>

					{safari &&
						<>
						<Row gutter={[16, 16]} type="flex" justify="center">
							<Col xs={24}>
								<Card>
									<h2>Sending Binance Smart Chain transactions requires Chrome and Metamask</h2>
									<div className='sparta-button'><a href='https://metamask.io' rel="noopener noreferrer" title="Metamask Link" target="_blank">Download Metamask</a></div>
								</Card>
							</Col>
						</Row>
						</>
					}
					{!safari &&
						<>
							<AllocationTable />
						</>
					}

			<br/><br/>

		</>
	)
}
export default Allocations
