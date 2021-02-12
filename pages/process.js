// @generated: @expo/next-adapter@2.1.0
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { StateReducer, InitialState, getContent } from '../utils';

import {StateProvider} from "../components/State";
import Main from "../components/Main";
import Head from "next/head";


function App(props) {

  const { content } = props;

  const initialState = InitialState(props);

  return (
      <StateProvider initialState={initialState} reducer={StateReducer}>
        <Head>
            <title>{content.page_title} - Spicy Green Book</title>
            {content.description && 
                <meta
                name="description"
                content={content.description}
                key="description"
                />
            }
            {content.description && 
                <meta
                name="og:description"
                content={content.description}
                key="og:description"
                />
            }
            <meta property="og:title" content={content.page_title + " - Spicy Green Book"} key="title" />
            <meta property="og:url" content={"https://spicygreenbook.org/" + content.uid } key="og:url" />
        </Head>
        <Main {...props} />
      </StateProvider>
  );
}

export async function getStaticProps(context) {
    let content = await getContent({type: 'content', uid: 'our-process', ref_id: context.preview || ''});

    return {
        props: {content: content && content.content || {}, url: '/process'}
    };
}

export default App;