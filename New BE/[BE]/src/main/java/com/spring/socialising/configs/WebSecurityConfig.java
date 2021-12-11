package com.spring.socialising.configs;

import com.spring.socialising.securities.*;
import com.spring.socialising.securities.provider.AccountAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Order
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtTokenUtils jwtTokenUtils;

    @Autowired
    private AccountDetailsService accountDetailsService;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private MessageSource messageSource;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(getTaiKhoanProvider());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/rest/admin/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.GET, "/rest/admin/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.PUT, "/rest/admin/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/rest/admin/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.POST, "/rest/user/**").hasAuthority("USER")
                .antMatchers(HttpMethod.GET, "/rest/user/**").hasAuthority("USER")
                .antMatchers(HttpMethod.PUT, "/rest/user/**").hasAuthority("USER")
                .antMatchers(HttpMethod.DELETE, "/rest/user/**").hasAuthority("USER")
                .anyRequest().permitAll();
        http.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);

        http.headers().cacheControl();
    }

    private AuthenticationProvider getTaiKhoanProvider() {
        return new AccountAuthenticationProvider(accountDetailsService, messageSource);
    }


    @Bean
    public JwtTokenFilter authenticationTokenFilterBean() throws Exception {
        return new JwtTokenFilter();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public JwtTokenUtils getJwtTokenUtils() {
        return jwtTokenUtils;
    }



}
