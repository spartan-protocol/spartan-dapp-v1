import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../../context'

import Web3 from 'web3'

import {
    SPARTA_ADDR, ERC20_ABI,
    // getTokenContract, nodeAPI, UTILS_ADDR, UTILS_ABI,
    // getNewTokenData, getAccount,
} from '../../client/web3.js'
import { convertFromWei, currency } from '../../common/utils'

import { Col, Card } from 'antd'
import { Logo } from './logo'

export const SpartanPane = () => {

    const context = useContext(Context)

    const [spartanData, setSpartanData] = useState(
        { name: '', symbol: '', totalSupply: '', decimals: '', genesis: '' })
    const [emissionData, setEmissionData] = useState(
        { balance: '', totalBurnt: '', totalEmitted: 0, totalFees: '' })
    const [marketData, setMarketData] = useState(
        { priceUSD: 0.3, priceBNB: 0.01, bnbPrice: 30 })

    useEffect(() => {
        context.spartanData ? getspartanData() : loadspartanData()
        loadEmissionData()
        if (context.marketData) {
            setMarketData(context.marketData)
        }
        // eslint-disable-next-line
    }, [context.marketData])

    const getspartanData = () => {
        setSpartanData(context.spartanData)
    }

    const loadspartanData = async () => {
        // let web3 = new Web3(new Web3.providers.HttpProvider(nodeAPI()))
        // let contract = new web3.eth.Contract(UTILS_ABI, UTILS_ADDR)
        // console.log(contract)
        // var spartanData = await contract.methods.getTokenDetails(SPARTA_ADDR).call()

        // let account = await getAccount()
        // let spartanData = await getNewTokenData(SPARTA_ADDR, account)
        let spartanData = {
            name: 'SPARTAN PROTOCOL TOKEN',
            symbol: 'SPARTA',
            maxSupply: 300000000,
            initalSupply: 100000000,
        }
        console.log({ spartanData })
        context.setContext({
            "spartanData": spartanData
        })
        setSpartanData(spartanData)
    }

    const loadEmissionData = async () => {
        // let web3 = new Web3(new Web3.providers.HttpProvider(nodeAPI()))
        // let web3 = new Web3(Web3.givenProvider || nodeAPI())
        // let web3 = new Web3(nodeAPI())
        // let web3 = new Web3(new Web3.providers.HttpProvider('https://chain-api.singapore-01.ankr.com/7129aa8e-7000-4b28-9ae2-4c80dbcfd4d3'))
        let web3 = new Web3(Web3.givenProvider)
        let contract = new web3.eth.Contract(ERC20_ABI, SPARTA_ADDR)
        // console.log(contract)
        // let totalSupply = 'test'

        // let contract = await getTokenContract(SPARTA_ADDR)
        let totalSupply = convertFromWei(await contract.methods.totalSupply().call())
        let emissionData = {
            totalEmitted: totalSupply,
        }
        setEmissionData(emissionData)
        context.setContext({ "emissionData": emissionData })
    }

    // const loadMarketData = async () => {
    //     let spartaPrice = await getSpartanPrice()

    //     const marketData = {
    //         priceUSD: spartaPrice,
    //     }

    //     setMarketData(marketData)
    //     context.setContext({
    //         "marketData": marketData
    //     })
    // }

    return (

            <Card title="SPARTA Token">
              <Col xs={24} sm={8}>
                <h3>MAX SUPPLY</h3>
                <h2>{currency(spartanData.maxSupply, 0, 0, 'SPARTA').replace('SPARTA', '')}</h2>
                <br />
                <h3>EMITTED</h3>
                <h2>{currency(emissionData.totalEmitted, 0, 0, 'SPARTA').replace('SPARTA', '')}</h2>
              </Col>
              <Col xs={0} sm={8}>
                <Logo />
                <br />
                <br />
                <h1>{currency(marketData.priceUSD, 2, 2)}</h1>
              </Col>
              <Col xs={24} sm={8}>
                <h3>INITIAL DISTRIBUTION</h3>
                <h2>{currency(spartanData.initalSupply, 0, 0, 'SPARTA').replace('SPARTA', '')}</h2>
                <br />
                <h3>CIRCULATING CAP</h3>
                <h2>{currency((emissionData.totalEmitted * marketData.priceUSD), 0, 0)}</h2>
              </Col>
            </Card>

    )
}
