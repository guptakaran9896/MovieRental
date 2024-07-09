import React, { useState, useEffect } from 'react'
// import { SelectField } from '../../pages/Demo/SelectFeild/SelectField';

import {
    Col,
    Row,
} from "reactstrap"
import DemoMobx from '../../store/mobx/demo/demo';
import { toJS } from 'mobx';
import { SelectField } from '../SelectField/SelectField';

export default function CSC(props) {
    const [COUNTRIES, setCountries] = useState([]);
    const [STATES, setStates] = useState([]);
    const [CITIES, setCities] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            await DemoMobx.getCountries();
            setCountries(toJS(DemoMobx.countries))
            console.log(props?.selectedCountry, props?.selectedState,"Inside cscccc");
            if (props?.selectedCountry) {
                await DemoMobx.getStatesByCountry(props?.selectedCountry);
                // console.log(toJS(DemoMobx.states[props?.selectedCountry]));
                setStates(toJS(DemoMobx.states[props?.selectedCountry]));
                if (props?.selectedState) {
                    await DemoMobx.getCitiesByCountryAndState(props?.selectedCountry, props?.selectedState);
                    setCities(toJS(DemoMobx.cities[props?.selectedCountry + '/' + props?.selectedState]))
                }
            }
        }
        fetch();
    }, [])

    const countrySelected = async (sc) => {
        props?.setSelectedCountry(sc);
        stateSelected('');
        if (sc !== '') {
            await DemoMobx.getStatesByCountry(sc);
            setStates(toJS(DemoMobx.states[sc]))
        } else {
            setStates([])
        }
    }
    const stateSelected = async (ss) => {
        props?.setSelectedState(ss);
        props?.setSelectedCity('');
        if (ss !== '' && props?.selectedCountry !== '') {
            await DemoMobx.getCitiesByCountryAndState(props?.selectedCountry, ss);
            setCities(toJS(DemoMobx.cities[props?.selectedCountry + '/' + ss]))
        } else {
            setCities([])
        }
    }
    return (
        <React.Fragment>
            {/* <Card> */}
            <Row className="my-3">

                <SelectField
                    onChange={(v) => countrySelected(v)}
                    data={COUNTRIES}
                    value={props?.selectedCountry}
                    showClear={true}
                    label={'Country'}
                    error={props?.selectedCountry?.length === 0 ? 'Please choose Country' : ''}
                    showErr={props?.showErr}
                    className="col-sm-4"
                />

                <SelectField
                    onChange={(v) => stateSelected(v)}
                    data={STATES}
                    value={props?.selectedState}
                    showClear={true}
                    label={'State'}
                    isDisabled={!props?.selectedCountry}
                    error={props?.selectedState?.length === 0 ? 'Please choose State' : ''}
                    showErr={props?.showErr}
                    className="col-sm-4"
                />

                <SelectField
                    onChange={(v) => props?.setSelectedCity(v)}
                    data={CITIES}
                    value={props?.selectedCity}
                    showClear={true}
                    isDisabled={!(props?.selectedCountry && props?.selectedState)}
                    label={'City'}
                    error={props?.selectedCity?.length === 0 ? 'Please choose city' : ''}
                    showErr={props?.showErr}
                    className="col-sm-4"
                />

            </Row>
        </React.Fragment>
    )
}
