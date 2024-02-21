
import { Button as Buttons, Image, Row, Tooltip } from 'antd'
import React, { useMemo, useState } from 'react'
import Button from '../../../Components/Form/Button'
import { HeaderIconHolder, BtnSideHolder } from '../../style'
import { MdMessage, MdNotificationsActive } from 'react-icons/md'
import { FaUserTie, FaUserCircle } from 'react-icons/fa'
import Flex from '../../../Components/Flex'
import { useDispatch } from 'react-redux'
import { LogOutSuccess } from '../../../Modules/Auth/actions'
import { AiOutlineMenuUnfold } from "react-icons/ai";

const NavHeader = ({ collapse, setCollapse }) => {

  const [arrow, setArrow] = useState('Show');
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(LogOutSuccess())
  };

  const text = <span>
    {/* <Flex spcPading centerVertically>
      <FaUserCircle />&nbsp;View profile
    </Flex> */}
    <Flex spcPading center>
      <Button onClick={handleLogout}>Logout</Button>
    </Flex>
  </span>;

  const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false;
    }
    if (arrow === 'Show') {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  const collapsed = collapse
  const setCollapsed = setCollapse




  return (
    <>
      <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>

        <div>
          <Row style={{ alignItems: 'center' }}>
            <div className="logo" style={{ height: '10%', textTransform: 'uppercase' }}>
              BIZ Flow
            </div>

            <BtnSideHolder onClick={() => setCollapsed(!collapsed)} >
              <AiOutlineMenuUnfold className='header__icon' />
            </BtnSideHolder>

          </Row>
        </div>

        <HeaderIconHolder>

          <MdMessage className='header__icon' />

          <MdNotificationsActive className='header__icon' />

          <Tooltip placement="bottomRight" title={text} arrow={mergedArrow}>
            <FaUserTie className='header__icon' />
          </Tooltip>

        </HeaderIconHolder>

      </Row>

    </>
  )
}

export default NavHeader
