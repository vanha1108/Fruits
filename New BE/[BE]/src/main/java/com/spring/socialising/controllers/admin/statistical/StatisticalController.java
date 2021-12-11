package com.spring.socialising.controllers.admin.statistical;

import com.spring.socialising.entities.response.ResponseData;
import com.spring.socialising.services.StatisService.StatisService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/rest/admin")
public class StatisticalController {
    @Autowired
    private StatisService statisService;

    @ApiOperation("Get summary data statistical")
    @GetMapping("/statis")
    public ResponseEntity<ResponseData> getSummaryDataForAdmin() {
        return new ResponseEntity<>(
                new ResponseData(true, "Successfully", statisService.getSummaryStatistical()), OK);
    }
}
