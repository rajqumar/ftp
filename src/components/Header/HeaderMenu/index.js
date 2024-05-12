import React, { useState } from 'react';
import {
  Collapse,
  NavbarToggler,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import MenuItems from '../MenuItems';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

const HeaderMenu = props => {
  const { isLoggedIn, menuItems } = props;

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    localStorage.removeItem('ftp_token');
    window.localStorage.removeItem('supplier_id');
    window.localStorage.removeItem('part_id');
    router.push('/');
  };

  var logoutButton = null;
  if (isLoggedIn) {
    logoutButton = (
      <NavLink className="nav_link_head">
        <DropdownItem className="first-active-menu" key="login" onClick={logout}>
          LOGOUT
        </DropdownItem>
      </NavLink>
    );
  }

  var mr_class = isLoggedIn ? 'mr_class' : '';
  const role = useSelector(state => state.layout);

  return (
    <div className={mr_class}>
      <NavbarToggler onClick={toggle} className="mr-2" />
      <Collapse isOpen={isOpen} navbar className="navbar-collapse">
        <Nav navbar>
          {menuItems.map((m, i) => {
            return m.submenu && m.submenu.length > 0 ? (
              <UncontrolledDropdown key={i}>
                {!isLoggedIn &&
                Object.keys(router.query).length > 0 &&
                (router.query.isppeuser == 'true' || router.query.healthcare === 'true') ? (
                  ''
                ) : (
                  <DropdownToggle nav caret className="static-menu-title">
                    <FontAwesomeIcon icon={m.icon} width="16" />
                    &nbsp; {m.name}
                  </DropdownToggle>
                )}
                <DropdownMenu down="true">
                  {m.submenu.map((subitem, j) => {
                    var rfqUrl =
                      ((m.name == 'QUOTES' || m.name == 'ORDERS' || m.name == 'PAYMENTS') &&
                        (subitem.name == 'REQUEST FOR QUOTATION' ||
                          subitem.name == 'QUOTATIONS' ||
                          subitem.name == 'PURCHASE ORDERS' ||
                          subitem.name == 'SALES ORDERS' ||
                          subitem.name == 'DELIVERY ORDERS' ||
                          subitem.name == 'INVOICE') &&
                        role &&
                        role.role !== undefined &&
                        (role.role == 'admin' || role.role == 'buyer') &&
                        (router.pathname == '/dashboard/buyer' ||
                          router.pathname == '/dashboard/manager' ||
                          router.pathname == '/rfq/buy/list' ||
                          router.pathname == '/so/buy/list' ||
                          router.pathname == '/po/buy/list' ||
                          router.pathname == '/do/buy/list' ||
                          router.pathname == '/quotations/buy/list' ||
                          router.pathname == '/rfq/buy/create' ||
                          router.pathname == '/invoice/buy/list')) ||
                      (role &&
                        role.role !== undefined &&
                        role.role == 'buyer' &&
                        router.pathname == '/dashboard/seller')
                        ? subitem.url[0]
                        : role && role.role !== undefined && !role.role == 'seller' && !router.pathname.includes('sell')
                        ? subitem.url[0]
                        : subitem.url[1];

                    return (
                      <React.Fragment key={j}>
                        <NavLink
                          className="nav_link_head"
                          href={rfqUrl != undefined && rfqUrl.length > 1 ? rfqUrl : subitem.url ? subitem.url : '#'}
                          key={j}>
                          <DropdownItem className="first-active-menu" to={subitem.url}>

                            {role && role.role !== undefined && role.role == 'seller' && subitem.seller
                              ? subitem.name
                              : ''}
                            {role && role.role !== undefined && role.role == 'buyer' && subitem.buyer
                              ? subitem.name
                              : ''}
                            {role &&
                            role.role !== undefined &&
                            role.role == 'admin' &&
                            router.pathname == '/dashboard/buyer' &&
                            subitem.buyer
                              ? subitem.name
                              : ''}
                            {role &&
                            role.role !== undefined &&
                            role.role == 'admin' &&
                            router.pathname == '/dashboard/seller' &&
                            subitem.seller
                              ? subitem.name
                              : ''}
                            {role &&
                            role.role !== undefined &&
                            role.role == 'admin' &&
                            router.pathname == '/dashboard/manager'
                              ? subitem.name
                              : ''}
                            {router.pathname != '/dashboard/manager' &&
                            router.pathname != '/dashboard/buyer' &&
                            router.pathname != '/dashboard/seller'
                              ? subitem.name
                              : ''}
                          </DropdownItem>
                        </NavLink>
                        {5 === i && 2 === j ? logoutButton : null}
                      </React.Fragment>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <MenuItems key={i} name={m.name} icon={m.icon} url={m.url} isLoggedIn={isLoggedIn} />
            );
          })}
        </Nav>
      </Collapse>

      <style>{`
        .subitem-menu{
          background-color: #ccc;
          text-transform: uppercase;
          font-size: 11px;
          font-weight: 600;
        }
      
        .mr_class {
          margin-right: 150px;
        }
 
        .subitem-menu:hover {
          color: #d2232a !important;
          text-decoration: none;
          background-color: #f8f9fa;
          font-size: 11px;
          text-transform: uppercase;
          font-weight: 600;
      }
        .first-active-menu{
          font-size: 13px;
          font-weight: 600;
          padding: 3px 15px;
          line-height: 20px;
          text-transform: uppercase;
        }
        .first-active-menu:hover{
          background-color: #e8e8e8;
        }

        .first-active-menu:focus{
          outline: 5px auto #fff;
        }
        .first-active-menu.active, .first-active-menu:active {
          color: #333;
          text-decoration: none;
          background-color: #fff;
      }
        .static-menu-title{
          text-transform: uppercase;
          font-weight: 600;
          padding: 15px !important;
          color: #333 !important;
          font-size: 13px !important;
        }
        .static-menu-title:hover{
          background-color: transparent !important;
         color: #d2232a !important;
        }
        `}</style>
    </div>
  );
};

HeaderMenu.propTypes = {
  isLoggedIn: PropTypes.bool,
  menuItems: PropTypes.func,
};

export default HeaderMenu;
