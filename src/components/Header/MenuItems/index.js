import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

function MenuItems(props) {
  const { name, icon, url, key, isLoggedIn } = props;
  const router = useRouter();

  return (
    <div key={key} className="menu_items">
      <NavItem>
        {!isLoggedIn &&
        Object.keys(router.query).length > 0 &&
        (router.query.isppeuser == 'true' || router.query.healthcare === 'true') ? (
          name != 'Search Parts / suppliers' ? (
            <NavLink
              className="nav_link_head static-menu-title"
              href={
                router.query.category !== undefined &&
                router.query.category != 'null' &&
                (url === '/login' || url === '/register')
                  ? `${url}?isppeuser=${true}`
                  : router.query.isppeuser == 'true' || router.query.healthcare === 'true'
                  ? `${url}?isppeuser=${true}`
                  : url
              }>
              <FontAwesomeIcon icon={icon} width="16" /> {name}
            </NavLink>
          ) : (
            ''
          )
        ) : (
          <NavLink
            className="nav_link_head static-menu-title"
            href={
              router.query.category !== undefined &&
              router.query.category != 'null' &&
              (url === '/login' || url === '/register')
                ? `${url}?isppeuser=${true}`
                : url
            }>
            <FontAwesomeIcon icon={icon} width="16" /> {name}
          </NavLink>
        )}
      </NavItem>
      <style jsx>{`
        .menu_items {
          color: #333 !important;
          padding: 0px 0px 0 20px;
          text-transform: uppercase;
        }
        .menu_items > li > a {
          color: #333 !important;
        }
        .static-menu-title {
          text-transform: uppercase;
          font-weight: 600;
          padding: 10px 5px !important;
          color: #333 !important;
          font-size: 13px !important;
        }
        .nav_link_head {
        }
        .static-menu-title:hover {
          color: red !important;
        }
      `}</style>
    </div>
  );
}

MenuItems.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.object,
  url: PropTypes.string,
  key: PropTypes.integer,
  isLoggedIn: PropTypes.bool,
};

export default MenuItems;
