return (
    <ThemeProvider theme={AppTheme}>
        <CssBaseline />
        <div className="bgImageContainer">
            {showPopUp ? <PopUp popUpMessage={popUpMessage} handleBackPopUpPress={handleBackPopUpPress} handleContinuePopUpPress={handleContinuePopUpPress} /> : null}
            {currentPageNumber === 4 ? (
                <>
                    <ConfirmationScreen />
                </>
            ) : null}
            <div className="logoContainer">
                <img src={adLabsLogo} alt="logo"></img>
            </div>
            <div className="appContainer">
                <div className="topSub">
                    {currentPageNumber !== 4 ? <Filename inputValues={inputValues} /> : null}
                    {currentPageNumber !== 4 ? <WarningMessage warningMessageText={warningMessageText} warningMessageTextShowIcon={warningMessageTextShowIcon} /> : null}
                    {currentPageNumber === 2 && !isElevator ? (
                        <div className="elpNavigatorContainer">
                            <div data-value="1" onClick={handleELPNavClick} className={`elpNavButton ${currentBuildNavNumber === 1 ? "current" : "enabled"}`}>
                                LFD
                            </div>
                            <div data-value="2" onClick={handleELPNavClick} className={`elpNavButton ${currentBuildNavNumber === 2 ? "current" : inputValues.product === 1 && !isElevator && Object.keys(lfdFile).length === 0 ? "disabled" : "enabled"}`}>
                                PFD
                            </div>
                        </div>
                    ) : null}

                    {currentPageNumber === 2 && inputValues.product === 0 ? (
                        <BlackWhiteToggleButton
                            handleDefaultBintBGColorChange={handleDefaultBintBGColorChange}
                            handleBINTColorChange={handleBINTColorChange}
                            isBlackText={isBlackText}
                            noBintImages={noBintImages}
                            defaultBintBGColor={defaultBintBGColor}
                            bintBGColor={bintBGColor}
                            handleBlackWhiteToggleChange={handleBlackWhiteToggleChange}
                            handleNoImagesToggleChange={handleNoImagesToggleChange}
                        >
                            {" "}
                        </BlackWhiteToggleButton>
                    ) : null}

                    {currentPageNumber !== 4 ? <BackButton handleBackButton={handleBackButton} /> : null}
                </div>
                <div className="contentSub">
                    {/* PAGE 1 */}
                    {/* {`adBuildingPageInner ${currentBuildNavNumber === 2 ? "hide" : ""}`} */}

                    {currentPageNumber !== 4 ? (
                        <div className={`inputsPage page ${currentPageNumber !== 1 ? "hide" : ""}`}>
                            <Inputs productIndex={productIndex} inputValues={inputValues} handleAnyInputsChange={handleAnyInputsChange} inputsCheckButtonPressed={inputsCheckButtonPressed} inputsCheckButtonPressedOnce={inputsCheckButtonPressedOnce} />
                        </div>
                    ) : null}

                    {/* PAGE 2 */}
                    <div className={`adBuildingPageContent ${currentPageNumber === 2 && isElevator === true ? "elevator" : currentPageNumber === 2 && isElevator === false && currentBuildNavNumber === 1 ? "landscape" : "portrait"}`}>
                        <div className={`adBuildingPage page ${isElevator === true ? "elevator" : isElevator === false ? "landscape" : "portrait"} ${currentPageNumber !== 2 ? "hide" : ""}`}>
                            {/* when this classname is set to e l or p, that's what sets the h and w of the div which contains all building elements*/}
                            <OpacityContext.Provider value={{ bintBGOpacity, isBlackText, noBintImages, bintBGColor, productIndex, svgFile, shakeDropzoneBGImage, elevatorFile, lfdFile, pfdFile }}>
                                {/* elevator */}
                                <div id={isElevator ? "screenGrabThis" : null} className={`adBuildingPageInner ${currentPageNumber === 2 && isElevator ? "" : "hide"}`}>
                                    <PageElevator
                                        handleDropzoneChanges={handleDropzoneChanges}
                                        handleWarningMessageText={handleWarningMessageText}
                                        handleContinueButtonDisabled={handleContinueButtonDisabled}
                                    />
                                </div>
                                {/* lfd */}
                                <div id={isElevator ? null : "screenGrabThis"} className={`adBuildingPageInner ${currentPageNumber === 2 && isElevator === false ? "" : "hide"}`}>
                                    <div className={`adBuildingPageInner ${currentBuildNavNumber === 2 ? "hide" : ""}`}>
                                        <PageLFD
                                            handleDropzoneChanges={handleDropzoneChanges}
                                            handleWarningMessageText={handleWarningMessageText}
                                            handleContinueButtonDisabled={handleContinueButtonDisabled}
                                        />
                                    </div>
                                    {/* pfd */}

                                    <div className={`adBuildingPageInner ${currentBuildNavNumber === 1 ? "hide" : ""}`}>
                                        <PagePFD
                                            handleDropzoneChanges={handleDropzoneChanges}
                                            handleWarningMessageText={handleWarningMessageText}
                                            handleContinueButtonDisabled={handleContinueButtonDisabled}
                                        />
                                    </div>
                                </div>
                            </OpacityContext.Provider>
                        </div>
                    </div>

                    {/* PAGE 3 */}

                    <div className={`resultsPage page ${currentPageNumber !== 3 ? "hide" : ""}`}>
                        <Results
                            allDroppedFilenames={allDroppedFilenames}
                            allDroppedNewFilenames={allDroppedNewFilenames}
                            filename={filename}
                            blankFilename={blankFilename}
                            requiresBlankFile={requiresBlankFile}
                            bintBGColor={bintBGColor}
                            productIndex={productIndex}
                            isBlackText={isBlackText}
                            inputValues={inputValues}
                            screenshot={screenshot}
                        />
                    </div>
                </div>

                <div className="navSub">
                    {currentPageNumber !== 4 ? (
                        <div className="buttonsHolder">
                            <div onClick={circleButtonClickHandler} dataindex={1} className={`circleButton ${currentPageNumber === 1 ? "current" : "enabled"}`}>
                                1
                            </div>
                            <div onClick={circleButtonClickHandler} dataindex={2} className={`circleButton ${currentPageNumber === 2 ? "current" : currentPageNumber > 2 ? "enabled" : "disabled"}`}>
                                2
                            </div>
                            <div onClick={circleButtonClickHandler} dataindex={4} className={`circleButton ${currentPageNumber === 3 ? "current" : "disabled"}`}>
                                3
                            </div>
                        </div>
                    ) : null}

                    <ContinueButton currentPageNumber={currentPageNumber} handleContinueButtonPressed={handleContinueButtonPressed} continueButtonDisabled={continueButtonDisabled}></ContinueButton>
                </div>
            </div>
        </div>
    </ThemeProvider >
);
}