package com.spring.socialising.controllers;

import com.spring.socialising.dtos.CustomerDTO;
import com.spring.socialising.dtos.TokenDetails;
import com.spring.socialising.entities.response.ResponseData;
import com.spring.socialising.securities.AccountDetailsService;
import com.spring.socialising.securities.JwtTokenUtils;
import com.spring.socialising.securities.JwtUserDetails;
import com.spring.socialising.securities.provider.AccountAuthenticationToken;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Locale;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/rest/login")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AccountDetailsService accountDetailsService;

    @Autowired
    private JwtTokenUtils jwtTokenUtils;

    @Autowired
    private MessageSource messageSource;

    @ApiOperation("User login form (phone_number, password)")
    @PostMapping()
    public ResponseEntity<ResponseData> loginUser(@Valid @RequestBody CustomerDTO dto) {
        Locale locale = LocaleContextHolder.getLocale();
        AccountAuthenticationToken authenticationToken = new AccountAuthenticationToken(
                dto.getUsername(),
                dto.getPassword(),
                true
        );
        try {
            authenticationManager.authenticate(authenticationToken);
            final JwtUserDetails userDetails = accountDetailsService
                    .loadUserByUsername(dto.getUsername());

            final TokenDetails result = jwtTokenUtils.getTokenDetails(userDetails, null);

            return new ResponseEntity<>(new ResponseData(true, "Login Successfully", result), OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(
                    new ResponseData(false, "ex.getMessage()", dto), BAD_REQUEST);
        }
    }
}
