import React from 'react';
import _ from 'lodash';

import {classNames} from '../utils';
import Action from './Action';

export default class Paypal extends React.Component {
    render() {
        let page = _.get(this.props, 'page', null);
        let menu = _.get(this.props, 'header_menu', null);
        return (
            <ul className="menu flex-md items-md-center">
            {_.map(menu, (item, item_idx) => {
                let page_url = _.trim(_.get(page, 'url', null), '/');
                let item_url = _.trim(_.get(item, 'url', null), '/');
                let item_style = _.get(item, 'style', null) || 'link';
                return (
                	<li key={item_idx} className={classNames('menu__item', 'ml-md-3', {'is-active': (page_url === item_url) && (item_style === 'link'), 'menu__item-btn': item_style !== 'link'})}>
                		<Action {...this.props} action={item} />
                	</li>
                )
            })}
            </ul>
        );
    }
}

<div id="smart-button-container">
      <div style="text-align: center;">
        <div id="paypal-button-container"></div>
      </div>
    </div>
  <script src="https://www.paypal.com/sdk/js?client-id=AaaEWMK0RV8r4IB_6yGA46BCS9Ys19qaqFbNgYM1pvdaLYqEorCJlf0b9HLgA1adc65xGqxkjXPmmGHi&enable-funding=venmo&currency=USD" data-sdk-integration-source="button-factory"></script>
  <script>
    function initPayPalButton() {
      paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'paypal',
          
        },

        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [{"description":"3 Months access","amount":{"currency_code":"USD","value":36}}]
          });
        },

        onApprove: function(data, actions) {
          return actions.order.capture().then(function(orderData) {
            
            // Full available details
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

            // Show a success message within this page, e.g.
            const element = document.getElementById('paypal-button-container');
            element.innerHTML = '';
            element.innerHTML = '<h3>Thank you for your payment!</h3>';

            // Or go to another URL:  actions.redirect('thank_you.html');
            
          });
        },

        onError: function(err) {
          console.log(err);
        }
      }).render('#paypal-button-container');
    }
    initPayPalButton();
  </script>