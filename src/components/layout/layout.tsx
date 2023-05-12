import { NextSeo } from 'next-seo';
import Header from '@components/layout/header/header';
import Footer from '@components/layout/footer/footer';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation';
import Search from '@components/common/search';
import CookieBar from '@components/common/cookie-bar';
import { useAcceptCookies } from '@utils/use-accept-cookies';
import Button from '@components/ui/button';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useRef } from "react";
export default function Layout({ children }: React.PropsWithChildren<{}>) {
	const buttonElement = useRef(null);
	const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
	const { t } = useTranslation('common');
	function scrollToTop() {
		window.scrollTo(0, 0);
	}

	return (
		<div className="flex flex-col min-h-screen">
			<style>
				{`			#myBtn {
  display: block;
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
  font-size: 30px;
  border: none;
  outline: none;
  background-color: #5a5a5a;;
  color:  white;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom:5px;
  border-radius: 50px;
  width:50px;


}`}</style>
			
			<NextSeo
				additionalMetaTags={[
					{
						name: 'viewport',
						content: 'width=device-width, initial-scale=1.0',
					},
				]}
				title="ChawkBazar React - React Next E-commerce Template"
				description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
				canonical="https://chawkbazar.vercel.app/"
				openGraph={{
					url: 'https://chawkbazar.vercel.app',
					title: 'ChawkBazar React - React Next E-commerce Template',
					description:
						'Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.',
					images: [
						{
							url: '/assets/images/og-image-01.png',
							width: 800,
							height: 600,
							alt: 'Og Image Alt',
						},
						{
							url: '/assets/images/og-image-02.png',
							width: 900,
							height: 800,
							alt: 'Og Image Alt Second',
						},
					],
				}}
			/>
			<Header />
			<main
				className="relative flex-grow"
				style={{
					minHeight: '-webkit-fill-available',
					WebkitOverflowScrolling: 'touch',
				}}
			>
				{children}
				<button ref={buttonElement} id="myBtn" onClick={scrollToTop} style={{ position: 'fixed', bottom: 100, right: 50 }}>&uarr;</button>
			</main>
			<Footer />
			<MobileNavigation />
			<Search />
			<CookieBar
				title={t('text-cookies-title')}
				hide={acceptedCookies}
				action={
					<Button onClick={() => onAcceptCookies()} variant="slim">
						{/* @ts-ignore */}
						{t('text-accept-cookies')}
					</Button>
				}
			/>
		</div>
	);
}
