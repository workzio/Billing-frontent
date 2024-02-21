import React from 'react'
import {  UserOutlined } from '@ant-design/icons'
import { MdOutlineInventory } from 'react-icons/md';
import { SiMarketo} from 'react-icons/si'
import {TbLayoutDistributeVertical} from 'react-icons/tb'


export const Dashdata = [
  {
    id: 1,
    title: "Total Sales",
    icon:<UserOutlined style={{
      color: "purple",
      backgroundColor: ' white',
      borderRadius: 20,
      fontSize: 24,
      padding: 8,
    }}/>
  },
  {
    id: 2,
    title: " Total Purchase",
    icon:<MdOutlineInventory style={{
      color: "purple",
      backgroundColor: 'white',
      borderRadius: 20,
      fontSize: 40,
      padding: 8,
    }}/>
  },
  {
    id: 3,
    title: "Total Customers ",
    icon:<SiMarketo style={{
      color: "purple",
      backgroundColor: ' white',
      borderRadius: 20,
      fontSize: 40,
      padding: 8,
    }}/>
  },
  {
    id: 4,
    title: "Today Sale",
    icon:<TbLayoutDistributeVertical style={{
      color: "purple",
      backgroundColor: ' white',
      borderRadius: 20,
      fontSize: 40,
      padding: 8,
    }}/>
  }
];
