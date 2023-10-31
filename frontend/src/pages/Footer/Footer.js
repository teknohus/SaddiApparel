import React from 'react'
import {FiFacebook} from 'react-icons/fi';
import {AiOutlineHeart, AiOutlineInstagram} from 'react-icons/ai';
import { IoLogoYoutube} from 'react-icons/io';
import { Input,Stack } from '@chakra-ui/react'
import './footercss.css'
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <div className="footerCmp">
            <footer>
                <div className="footerCategorie">
                    <h1>Categories</h1>
                    <ul>
                        <li><Link to = '/shop/?cg=Women'>Women</Link></li>
                        <li><Link to = '/shop/?cg=Men'>Men</Link></li>
                        <li><Link to = '/shop/?cg=Shoes'>Shoes</Link></li>
                        <li><Link to = '/shop/?cg=Watches'>Watches</Link></li>
                    </ul>
                </div>

                <div className="fooHelp">
                    <h1>Help</h1>
                    <ul>
                        <li>Track Order</li>
                        <li>Returns</li>
                        <li>Shipping</li>
                        <li>FAQs</li>
                    </ul>
                </div>

                <div className="footerGetInTouch">
                    <h1>Get in touch</h1>
                    <ul>
                        <p>Any questions? Let us know in store at BP 473 Complexe universitaire Al Qods, Oujda 60000 or call us on (+212) 65964665</p>
                        <li className="footerIcons">
                            <FiFacebook size="25" />
                        </li>
                        <li className="footerIcons">  
                            <AiOutlineInstagram size="25" />
                        </li>
                        <li className="footerIcons">
                            <IoLogoYoutube size="25"/>
                        </li>
                    </ul>
                </div>

                <div className="footerNews">
                    <h1>Newsletter</h1>
                    <ul>
                        <li>
                            <Stack spacing={3}>
                            <Input variant="flushed" placeholder="email@example.com" size="10" width="200px"/>
                            </Stack>
                        </li>
                        <li>
                            <button className="footerBtn">Subscribe</button>
                        </li>
                    </ul>
                </div>

                <div className="creditsIcons">
                    <ul>
                        <li><img src="https://i.imgur.com/AHCoUZO.png" /></li>
                        <li><img src="https://i.imgur.com/JZRipBg.png"  /></li>
                        <li><img src="https://i.imgur.com/l8OAGyo.png"  /></li>
                        <li> <img src="https://i.imgur.com/IDHC2iv.png" /></li>
                    </ul>
                    
                </div>
                
                <div className="paragraphFooter"><p>Copyright ©2021 All rights reserved | This template is made with ♡ by Developers of ESTO</p>
                <Link to = '/' >Home</Link>
                <Link to = '/about'  >About Us</Link>
                <Link to = '/contactus'  >Contact Us</Link>
                </div>



            </footer>

        </div>
    )
}

export default Footer;
